---
type: post
title: "Guarantee Event Order with RxJS"
lead: >-
  Write some cool lead here
date: 2019-01-09T15:03:22+01:00
comments: true
# image: /blog/assets/imgs/rx-to-promise-journey/rxjourney-bg.jpg
categories:
  - RxJS
  - Angular
# tags:
#   - rxjs
#   - angular
draft: true
---

<div class="article-intro">
  When you create dynamic UIs, you have to deal with async stuff a lot. Most often they are triggered by some user interaction. Things usually get tricky when you need to guarantee certain operations are executed in order. Since they are async we might not know which one returns first. Let's see how RxJS can help a lot here.
</div>

<!--more-->

{{<postad>}}

## The Problem


{{<stackblitz uid="edit/blog-guarantee-order">}}
https://stackblitz.com/edit/blog-guarantee-order?file=app%2Fcheckbox-configurable-example.html


## NOTES

Describe the main problem first

- clicking the checkbox triggers async action => fetches data
- once data arrives, it gets added to the list
- when unchecking, the record gets removed again
- **problem:** double-clicks => async operation too slow

The solution is to pipe it through RxJS:

- don't execute on click, but rather push it into rxjs "queue" using `concatMap`
- will guarantee order of operations

---

```typescript
...

@Component({
  selector: 'app-inspection-detail',
  templateUrl: './inspection-detail.component.html',
  providers: [VtaDetailService]
})
export class InspectionDetailComponent extends DetailBaseComponent<InspectionEntity>
  implements OnInit, AfterDataLoaded {
  private propSelectionChangeEvSubj = new Subject<MulticheckboxListSelectionChangeEv>();
  ...

  r3OnInit(appConfig: AppConfig) {
    ...

    this.userFields = [
      {
        key: 'inspection_property',
        type: 'r3-multicheckbox-list',
        className: 'mat-border-disable',
        templateOptions: {
          label: this.infrastructure.translations.instant('Defects'),
          options: this.infrastructure.lookupDataService.getLookupByObjectType(ObjectTypes.PLAY_PROPERTY),
          selectionChange: (ev: MulticheckboxListSelectionChangeEv) => {
            this.propSelectionChangeEvSubj.next(ev);
            // if (ev.checkboxEvent.checked) {
            //   this.infrastructure.entityDataService
            //     .fetchAll<JobInspectionListEntity>(
            //       this.infrastructure.apiUrlConfig.getValue(TreesApiEndpoints.TREE_PROPOSED_JOBS_BY_PROP_AND_PLAY, {
            //         pr_id: ev.option.value
            //       }),
            //       { pl_id: this.userModel.pl_id }
            //     )
            //     .pipe(map(x => x.rows))
            //     .subscribe(jobs => {
            //       const isJobPresent = this.jobListService.getProposedJobs().find(x => +x.pr_id === ev.option.value);
            //       if (!isJobPresent) {
            //         this.jobListService.addJobToList(
            //           {
            //             proposed: jobs
            //           },
            //           true
            //         );
            //       }
            //     });
            // } else {
            //   this.jobListService.addJobToList({
            //     // remove the entry again where the pr_id matches the unselected checkbox
            //     proposed: this.jobListService.getProposedJobs().filter(x => x.pr_id !== `${ev.option.value}`)
            //   });
            // }
          }
        },
        hooks: {
          onInit: (field?: FormlyFieldConfig) => {
            this.propSelectionChangeEvSubj
              .pipe(
                concatMap(ev => {
                  if (ev.checkboxEvent.checked) {
                    return this.infrastructure.entityDataService
                      .fetchAll<JobInspectionListEntity>(
                        this.infrastructure.apiUrlConfig.getValue(
                          TreesApiEndpoints.TREE_PROPOSED_JOBS_BY_PROP_AND_PLAY,
                          {
                            pr_id: ev.option.value
                          }
                        ),
                        { pl_id: this.userModel.pl_id }
                      )
                      .pipe(
                        map(x => x.rows),
                        map(x => {
                          return {
                            type: 'ADD',
                            ev: ev,
                            rows: x
                          };
                        })
                      );
                  } else {
                    return of({
                      type: 'REMOVE',
                      ev: ev,
                      rows: null
                    });
                    // this.jobListService.addJobToList({
                    //   // remove the entry again where the pr_id matches the unselected checkbox
                    //   proposed: this.jobListService.getProposedJobs().filter(x => x.pr_id !== `${ev.option.value}`)
                    // });
                  }
                }),
                takeUntil(this.onDestroy$)
              )
              .subscribe(action => {
                if (action.type === 'ADD') {
                  const isJobPresent = this.jobListService
                    .getProposedJobs()
                    .find(x => +x.pr_id === action.ev.option.value);
                  if (!isJobPresent) {
                    this.jobListService.addJobToList(
                      {
                        proposed: action.rows
                      },
                      true
                    );
                  }
                } else {
                  this.jobListService.addJobToList({
                    // remove the entry again where the pr_id matches the unselected checkbox
                    proposed: this.jobListService.getProposedJobs().filter(x => x.pr_id !== `${action.ev.option.value}`)
                  });
                }
              });
          }
        }
      }
    ];
  }

}
```
