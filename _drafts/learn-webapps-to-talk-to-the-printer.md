
Just reading the title might sound really weird. Would I even want that?? Well, about a year ago we started a project, creating an office software were people had the requirement to print documents directly to a printer connected to the computer itself. This sounds very much like a desktop app, right. You have to talk to the hardware connected to a given computer.

## Approach 1 - ActiveX

Uhh...ActiveX!



## Printer Component

C#.Net piece of software/library that does stuff like

- reading out local as well as network printers
- accepting "print jobs" in the form of XPS documents and submitting them to a given printer as well as a configured printer tray

## Approach 1 - ActiveX

Wrap everything inside an ActiveX which instantiates the .Net dll. The ActiveX component is controllable from JavaScript running in the browser.

Cons:

- COM
- IE (the department only had IE8!)

## Approach 2 - Having a local service

Having a local service exposing a REST api at a given port and have the web application POST/GET to localhost for printing

## Kerberos Authentication

- Apparently it doesn't work: https://github.com/rogerwang/node-webkit/issues/590
- Chromium Http Auth: http://www.chromium.org/developers/design-documents/http-authentication

### Node Libraries supporting kerberos:

**kerberos**

For building: http://stackoverflow.com/questions/17333821/npm-kicks-off-msbuild-and-fails



## Links

- http://www.infoq.com/articles/the_edge_of_net_and_node
- https://github.com/tjanczuk/edge/blob/master/samples/105_add7_dll.js
- https://github.com/tjanczuk/edge#how-to-integrate-c-code-into-nodejs-code
- 
