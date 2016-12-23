import * as ngc from '@angular/core';

@ngc.Component({
    selector: 'solo-tracker',
    templateUrl: 'app/components/app.component.html',
})
export class AppComponent implements ngc.AfterViewInit {
    @ngc.ViewChild('mapContainer') mapContainerElementRef: ngc.ElementRef
    @ngc.ViewChild('map') mapElementRef: ngc.ElementRef

    constructor() {
        window['initMap'] = () => {
            this.mapElementRef.nativeElement = new google.maps.Map(this.mapElementRef.nativeElement, {
                center: { lat: 47.4883, lng: -121.9467 },
                zoom: 12
            });
        };
    }

    ngAfterViewInit(): void {
        this.fillMapToClientBounds();

        let node = document.createElement('script');
        node.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDuUvDZsuhwVYScoNpK6Id4SEC3jQ73YSI&callback=initMap';
        node.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    fillMapToClientBounds(): void {
        let mapElement = this.mapContainerElementRef.nativeElement;
        let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        let height = Math.min(document.documentElement.clientHeight, window.innerHeight || 0);

        mapElement.style.width = width;
        mapElement.style.height = height;
    }
}