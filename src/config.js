export const mapConfig = {
    accessToken: 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q',
    style: 'mapbox://styles/devseed/cjlp9k7nr7ij02rlgerg2e8r2',
};
export const rasterLayers = [
    {
        id: 'esri-world-imagery',
        name: 'Esri World Imagery',
        source: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        active: false
    }
];

export const vectorLayers = [
    {
        id: 'Area-1',
        name: 'Area 1',
        source: 'https://s3.amazonaws.com/ds-data-projects/courage-services-inc/danny-p.geojson',
        active: true
    },
    {
        id: 'Area-2',
        name: 'Area 2',
        source: 'https://s3.amazonaws.com/ds-data-projects/courage-services-inc/karito-p.geojson',
        active: true
    },
    {
        id: 'Area-3',
        name: 'Area 3',
        source: 'https://s3.amazonaws.com/ds-data-projects/courage-services-inc/edith-p.geojson',
        active: true
    },   {
        id: 'Area-4',
        name: 'Area 4',
        source: 'https://s3.amazonaws.com/ds-data-projects/courage-services-inc/richman-p.geojson',
        active: true
    },
    {
        id: 'Area-5',
        name: 'Area 5',
        source: 'https://s3.amazonaws.com/ds-data-projects/courage-services-inc/pilar-p.geojson',
        active: true
    }
];


