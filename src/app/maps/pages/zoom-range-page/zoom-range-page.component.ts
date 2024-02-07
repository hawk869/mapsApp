import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.09644109195581, 4.702687959471163);

  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elemento HTML no fue encontrado'
    
    this.map = new Map({
    	container: this.divMap.nativeElement, // container ID
    	style: 'mapbox://styles/mapbox/streets-v12', // style URL
    	center: this.currentLngLat, // starting position [lng, lat]
    	zoom: this.zoom, // starting zoom
    });
    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove(); // con esto se eliminan los listeners
  }

  mapListeners() {
    if ( !this.map ) throw 'Mapa no inicializado';

    this.map.on('zoom', (evento) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (evento) => {
      if ( this.map!.getZoom() < 18 ) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
      const { lng, lat } = this.currentLngLat;
    })
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged( value: string ) {
    this.zoom = Number( value );
    this.map?.zoomTo( this.zoom );
  }

}
