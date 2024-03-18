import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { ViewBarcode } from './view';
import { CreateModelBarcode } from './model';

const ControllerBarcode = () => {
  const view = ViewBarcode();
  const model = CreateModelBarcode();

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

const controller = ControllerBarcode();
controller.initController();

export { ControllerBarcode };
