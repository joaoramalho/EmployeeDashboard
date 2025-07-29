import { Directive, ElementRef, input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSkeleton]',
  standalone: true
})
export class SkeletonDirective implements OnChanges {
  appSkeleton = input<boolean>(false);
  skeletonRows = input<number>(5);
  skeletonCols = input<number>(4);

  private originalContent: string = '';
  private skeletonCreated: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.appSkeleton()) {
      this.showSkeleton();
    } else {
      this.hideSkeleton();
    }
  }

  private showSkeleton() {
    if (!this.skeletonCreated) {
      this.originalContent = this.el.nativeElement.innerHTML;
      this.createSkeletonTable();
      this.skeletonCreated = true;
    }
    this.renderer.addClass(this.el.nativeElement, 'skeleton-loading');
  }

  private hideSkeleton() {
    if (this.skeletonCreated) {
      this.el.nativeElement.innerHTML = this.originalContent;
      this.renderer.removeClass(this.el.nativeElement, 'skeleton-loading');
      this.skeletonCreated = false;
      // Trigger change detection to re-render the original content
      setTimeout(() => {
        // Force the original content to be re-processed by Angular
      }, 0);
    }
  }

  private createSkeletonTable() {
    const table = this.renderer.createElement('table');
    this.renderer.addClass(table, 'mat-table');
    this.renderer.addClass(table, 'skeleton-table');

    // Create header row
    const headerRow = this.renderer.createElement('tr');
    this.renderer.addClass(headerRow, 'mat-header-row');
    
    for (let col = 0; col < this.skeletonCols(); col++) {
      const headerCell = this.renderer.createElement('th');
      this.renderer.addClass(headerCell, 'mat-header-cell');
      const skeletonHeader = this.renderer.createElement('div');
      this.renderer.addClass(skeletonHeader, 'skeleton-item');
      this.renderer.addClass(skeletonHeader, 'skeleton-header');
      this.renderer.appendChild(headerCell, skeletonHeader);
      this.renderer.appendChild(headerRow, headerCell);
    }
    this.renderer.appendChild(table, headerRow);

    // Create skeleton rows
    for (let row = 0; row < this.skeletonRows(); row++) {
      const tr = this.renderer.createElement('tr');
      this.renderer.addClass(tr, 'mat-row');
      
      for (let col = 0; col < this.skeletonCols(); col++) {
        const td = this.renderer.createElement('td');
        this.renderer.addClass(td, 'mat-cell');
        const skeletonItem = this.renderer.createElement('div');
        this.renderer.addClass(skeletonItem, 'skeleton-item');
        this.renderer.appendChild(td, skeletonItem);
        this.renderer.appendChild(tr, td);
      }
      this.renderer.appendChild(table, tr);
    }

    this.el.nativeElement.innerHTML = '';
    this.renderer.appendChild(this.el.nativeElement, table);
  }
}