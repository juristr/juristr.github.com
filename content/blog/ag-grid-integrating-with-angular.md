---
type: post
title: "A step-by-step guide to integrating a third party widget with Angular"
lead: >-
  A guest post by Max Koretskyi
date: 2019-02-14T21:24:36+01:00
comments: true
url: /blog/2019/02/ag-grid-integrating-with-angular
image: /blog/assets/imgs/ag-grid-post.jpg
categories:
  - Angular
tags:
  - angular
  - guest post
draft: false
author: maxim_koretskyi
---

{{<intro>}}
When working on a complex project you will inevitably face the situation when you have to use a 3rd party widget in your project. Also, most of the web projects today use frameworks. But the majority of widgets are available in pure JavaScript versions. To use them in your project, you’ll need to create a framework specific wrapper. 

<!--more-->

In this article I’ll demonstrate how to wrap a 3rd party widget into an Angular component using ag-Grid as an example. We’ll learn how to set up mapping between Angular input bindings and the widget’s configuration options and how to expose the widget’s API through an Angular component.
{{</intro>}}


{{<postad>}}

> This is a **guest post** by Max Koretskyi. Max finds patterns in frameworks and explains them. #Angular & #React contributor. DevEvangelist at @ag_grid. Chief Inspiration Officer at @AngularInDepth. GDE, MVP."

{{< toc >}}

At [ag-Grid](https://angular-grid.ag-grid.com/?utm_source=getstartedangular&utm_medium=blog&utm_campaign=medium) we focus on developing the fastest and most [feature rich data grid](https://www.ag-grid.com/features-overview/?utm_source=getstartedangular&utm_medium=blog&utm_campaign=medium) for web applications. The grid has no 3rd party dependencies and is specifically designed to deliver outstanding performance even for data sources exceeding 1 million records. And to make integrations with Angular applications easier, we’ve implemented an Angular data grid. It’s an Angular specific component that uses mechanisms specific to the framework to configure and instantiate our JavaScript datagrid.

## Defining things to bridge

Widgets usually take a whole host of configuration options, define public API and broadcasts events. Our JavaScript grid is not an exception here. [This reference page](https://www.ag-grid.com/javascript-grid-reference-overview/) provides a good description for the grid’s properties, events, callbacks and API. In short, it defines:

- Grid Properties that enable features of the grid, like row animation.
- Grid API to interact with the grid at runtime, e.g. to get all the selected rows
- Grid Events emitted by the grid when certain events happen in the grid, like row sorting or rows selection
- Grid Callbacks used to supply information from your application to the grid when it needs it, e.g. a callback is called each time a menu is shown that allows your application to customize the menu.

Here’s a very basic configuration that demonstrates the usage of grid options:

```typescript
let gridOptions = {

    // PROPERTIES - object properties, myRowData and myColDefs are created somewhere in your application
    rowData: myRowData,
    columnDefs: myColDefs,

    // PROPERTIES - simple boolean / string / number properties
    pagination: true,
    rowSelection: 'single',

    // EVENTS - add event callback handlers
    onRowClicked: function(event) { console.log('a row was clicked'); },
    onColumnResized: function(event) { console.log('a column was resized'); },
    onGridReady: function(event) { console.log('the grid is now ready'); },

    // CALLBACKS
    isScrollLag: function() { return false; }
}
```

Once the JavaScript data grid is initialized:

```typescript
new Grid(this._nativeElement, this.gridOptions, ...);
```

`ag-Grid` attaches the object with API methods to the `gridOptions` that can be used to control the JavaScript data grid:

```typescript
// get the grid to refresh
gridOptions.api.refreshView();
```

However, when ag-Grid is used as Angular component, we don’t instantiate the datagrid directly. This is done by the wrapper component. 

We don’t pass configuration options and callbacks directly to the grid. The component takes the options and callbacks through input bindings. All grid options that are available for vanilla JavaScript grid should be available in Angular datagrid as well. We also don’t listen for events on the instance of ag-Grid. All events emitted by ag-Grid should be available as Angular components outputs.

All interactions with the instance of ag-Grid occurs through the component instance. For example, we don’t have direct access to the API object attached by the grid. We will access it through the component’s instance.

This all means that an Angular specific wrapper around ag-Grid should:

- implement a mapping between input bindings (like rowData) and ag-Grid’s configuration options.
- should listen for events emitted by ag-Grid and define them as component outputs
- listen for changes in component’s input bindings and update configuration options in the grid
- expose API attached by ag-Grid to the gridOptions through its properties

We also defined a convention that properties, callbacks and event handlers should be registered using their `dash` syntax and not `camelCase`. For example, the property `rowAnimation` is bound using `row-animation`.

The following example demonstrates how Angular wrapper grid is configured in a template using input bindings and output events:

```html
<ag-grid-angular
    // assign an instance of ag-grid-angular component to the variable
    #myGrid

    // these are boolean values, which if included without a value, default to true
    // (which is different to leaving them out, in which case the default is false)
    row-animation
    pagination

    // these are not bound properties evaluated as strings
    row-selection="multiple"

    // these are bound properties evaluated in runtime
    [column-defs]="columnDefs"
    [show-tool-panel]="showToolPanel"

    // this is a callback
    [is-scroll-lag]="myIsScrollLagFunction"

    // these are registering event callbacks
    (cell-clicked)="onCellClicked($event)"
    (column-resized)="onColumnEvent($event)">
</ag-grid-angular>
```

Since Angular assigns an instance of the component to a template reference, which in this case is `myGrid`, the APIs exposed by `ag-Grid` is accessible through the component. It can then be used like this to interact with the grid:

```html
<button (click)="myGrid.api.deselectAll()">Clear Selection</button>
```

Now that we understand the requirement, let’s see how implemented it at `ag-Grid`.

## Angular wrapper implementation

First, we need to define an [Angular component](https://github.com/ag-grid/ag-grid/blob/3d14f9cc21fd8e9cda791ba0949568925160d64b/packages/ag-grid-angular/src/agGridNg2.ts#L42) to represent our Angular data grid in templates. We define a JavaScript class with all ag-Grid properties as input bindings and ag-Grid events as outputs. We also define `gridOptions` input binding in case a developer wants to pass options as one object:

```typescript
@Component({
    selector: 'ag-grid-angular',
    ...
})
export class AgGridNg2 implements AfterViewInit {
    @Input() public gridOptions: GridOptions;
 
    @Input() public rowData : any = undefined;
    @Input() public columnDefs : any = undefined;
    @Input() public rowStyle : any = undefined;
    ...

    @Output() public columnMoved: EventEmitter<any> = new EventEmitter<any>();
    @Output() public columnPinned: EventEmitter<any> = new EventEmitter<any>();
    @Output() public rowDataChanged: EventEmitter<any> = new EventEmitter<any>();
    ...
}
```

The `gridOptions` property is used to store all datagrid options. We need to copy all configuration options from the component class properties defined as input bindings to this object.

To do that, we’ve implemented the `copyAttributesToGridOptions` function. It’s just a utility function that copies properties from one object to the other. Here’s the gist of the function:

```typescript
export class ComponentUtil {
    ...
    public static copyAttributesToGridOptions(gridOptions, component, ...) {
        ...
        // copy all grid properties to gridOptions object
        ComponentUtil.ARRAY_PROPERTIES
            .concat(ComponentUtil.STRING_PROPERTIES)
            .concat(ComponentUtil.OBJECT_PROPERTIES)
            .concat(ComponentUtil.FUNCTION_PROPERTIES)
            .forEach(key => {
                if (typeof component[key] !== 'undefined') {
                    gridOptions[key] = component[key];
                }
            });

         ...

         return gridOptions;
    }
}
```

The options are copied in the `ngAfterViewInit` lifecycle method after all input bindings have been evaluated. This is also the hook where we instantiate the grid. Since we need to pass a native DOM element to the data grid when it’s being instantiated, we grab the element in the component’s constructor:

```typescript
export class AgGridNg2 implements AfterViewInit {
    private _nativeElement: any;

    constructor(elementDef: ElementRef, ...) {
        ...
        this._nativeElement = elementDef.nativeElement;
    }

    ngAfterViewInit(): void {
        ...
        this.gridOptions = ComponentUtil.copyAttributesToGridOptions(this.gridOptions, ...);
        new Grid(this._nativeElement, this.gridOptions, ...);
    }
}
```

## Synchronizing grid properties updates

Once the grid is initialized, we need to track changes to input bindings to update configuration options of the datagrid. ag-Grid implements API to do that, for example, if the `headerHeight` property changes there’s the `setHeaderHeight` method to update the height of a header.

Angular uses `ngOnChanges` lifecycle hook to notify a component about changes. This is where we put our update logic:

```typescript
export class AgGridNg2 implements AfterViewInit {
    ...
    public ngOnChanges(changes: any): void {
        if (this._initialised) {
            ComponentUtil.processOnChange(changes, this.gridOptions, this.api, ...);
        }
    }
}
```

The `processOnChange` method does two things. First, it goes over the changes in input bindings and updates properties on the `gridOptions` object. Next, it calls API methods to notify the grid about the changes:

```typescript
export class ComponentUtil {
    public static processOnChange(changes, gridOptions, api, ...) {
        ...
        // reflect the changes in the gridOptions object
        ComponentUtil.ARRAY_PROPERTIES
            .concat(ComponentUtil.OBJECT_PROPERTIES)
            .concat(ComponentUtil.STRING_PROPERTIES)
            .forEach(key => {
                if (changes[key]) {
                    gridOptions[key] = changes[key].currentValue;
                }
            });

        ...

        // notify Grid about the changes in header height
        if (changes.headerHeight) {
            api.setHeaderHeight(changes.headerHeight.currentValue);
        }

        // notify Grid about the changes in page size
        if (changes.paginationPageSize) {
            api.paginationSetPageSize(changes.paginationPageSize.currentValue);
        }
        
        ...
    }
}
```

## Exposing API

Interacting with the grid at run time is done through the grid API. You may want to adjust the columns size, set new data source, get a list of all selected rows etc. When the JavaScript datagrid is initiated, it attaches the api object to the grid options object. To expose this object, we simply assign it to the component instance:

```typescript
export class AgGridNg2 implements AfterViewInit {
    ...  
    ngAfterViewInit(): void {
        ...
        new Grid(this._nativeElement, this.gridOptions, ...);
        if (this.gridOptions.api) {
            this.api = this.gridOptions.api;
        }
    }
}
```

And that’s it.