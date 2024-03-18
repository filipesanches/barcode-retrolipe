import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { viewBarcode } from './view';
import { modelBarcode } from './model';

const controllerBarcode = () => {
  const view = viewBarcode();
  const model = modelBarcode();

  const clickGenerate = async () => {
    try {
      view.hideElementLabel();
      const typesBarcode = await model.getTypeBarcodes();
      console.log(typesBarcode);
      view.renderBarcode(typesBarcode, document.querySelector('#barcode').value);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  const initController = () => {
    view.hideElementLabel();
    view.resetInputs();
    const buttonGenerate = document.querySelector('#generate-barcode');
    buttonGenerate.addEventListener('click', clickGenerate);
  }

  return {
    initController,
  };
}

const controller = controllerBarcode();
controller.initController();

export { controllerBarcode };
