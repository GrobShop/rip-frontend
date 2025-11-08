import {createComponent, EnvironmentInjector, Injectable} from "@angular/core";
import {FullscreenViewerComponent} from "../components/fullscreen-viewer-component/fullscreen-viewer-component";

@Injectable({ providedIn: 'root' })
export class FullscreenService {
  constructor(private injector: EnvironmentInjector) {}

  open(images: string[], index = 0) {
    const comp = createComponent(FullscreenViewerComponent, {
      environmentInjector: this.injector
    });

    comp.instance.images = images;
    comp.instance.currentIndex = index;

    document.body.appendChild(comp.location.nativeElement);
    document.body.style.overflow = 'hidden';

    const sub = comp.instance.close.subscribe(() => {
      document.body.removeChild(comp.location.nativeElement);
      document.body.style.overflow = '';
      sub.unsubscribe();
      comp.destroy();
    });

    // Логика навигации
    comp.instance.prev.subscribe(() => {
      if (comp.instance.currentIndex > 0) {
        comp.instance.currentIndex--;
        comp.instance.scale = 1; comp.instance.tx = 0; comp.instance.ty = 0;
      }
    });

    comp.instance.next.subscribe(() => {
      if (comp.instance.currentIndex < images.length - 1) {
        comp.instance.currentIndex++;
        comp.instance.scale = 1; comp.instance.tx = 0; comp.instance.ty = 0;
      }
    });

    comp.instance.zoom.subscribe(delta => {
      comp.instance.scale = Math.max(0.5, Math.min(5, comp.instance.scale + delta));
    });

    comp.instance.reset.subscribe(() => {
      comp.instance.scale = 1; comp.instance.rotate = 0; comp.instance.tx = 0; comp.instance.ty = 0;
    });

    comp.instance.rotateLeft.subscribe(() => comp.instance.rotate -= 90);
    comp.instance.rotateRight.subscribe(() => comp.instance.rotate += 90);
  }
}
