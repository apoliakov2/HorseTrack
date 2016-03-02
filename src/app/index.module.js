
import { config } from './index.config';
import { appConstants } from './constants/appConstanrs.value';
import { errorCodes } from './constants/errorCodes.value.js';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { rightArrow } from './filters/rightArrowFilter';
import { inputService } from './services/input.service';
import { horsesService } from './services/horses.service';
import { commandsService } from './factories/commands.factory';
import { horseTrackErrors } from './factories/horseTrackErrors.factory.js';
import { inventoryService } from './services/inventory.service';
import { mainController } from './main/main.controller';

angular.module('horsetrack', ['ngAnimate', 'ngSanitize', 'ui.router', 'luegg.directives'])
  .config(config)
  .config(routerConfig)
  .constant('errorCodes', errorCodes)
  .constant('appConstants', appConstants)
  .filter('rightArrow', rightArrow)
  .factory('commandsService', commandsService)
  .factory('horseTrackErrors', horseTrackErrors)
  .service('inputService', inputService)
  .service('horsesService', horsesService)
  .service('inventoryService', inventoryService)
  .run(runBlock)
  .controller('MainController', mainController)
