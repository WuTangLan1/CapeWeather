// src/utils/clusterIcons.js
import L from 'leaflet';

const createClusterIcon = (cluster) => {
  const count = cluster.getChildCount();
  let size = 'small';

  if (count >= 10 && count < 100) {
    size = 'medium';
  } else if (count >= 100) {
    size = 'large';
  }

  return L.divIcon({
    html: `<div class="cluster-icon cluster-${size}">${count}</div>`,
    className: 'custom-cluster',
    iconSize: L.point(40, 40, true),
  });
};

export default createClusterIcon;
