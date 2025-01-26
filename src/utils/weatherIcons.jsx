// src/utils/weatherIcons.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloud,
  faCloudRain,
  faSnowflake,
  faSmog,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';

const weatherIcons = {
  sunny: <FontAwesomeIcon icon={faSun} size="lg" style={{ color: '#FFD700' }} />,
  cloudy: <FontAwesomeIcon icon={faCloud} size="lg" style={{ color: '#B0C4DE' }} />,
  rainy: <FontAwesomeIcon icon={faCloudRain} size="lg" style={{ color: '#1E90FF' }} />,
  snowy: <FontAwesomeIcon icon={faSnowflake} size="lg" style={{ color: '#00BFFF' }} />,
  smog: <FontAwesomeIcon icon={faSmog} size="lg" style={{ color: '#808080' }} />,
  stormy: <FontAwesomeIcon icon={faBolt} size="lg" style={{ color: '#FFA500' }} />,
};

export default weatherIcons;
