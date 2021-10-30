const rgbaRegex = require('rgba-regex');
const rgbRegex = require('rgb-regex');

exports.rgbaParse = function(colorString) {

  let tested = rgbaRegex({exact: true }).test(colorString);

  if (!tested) {
    return false;
  }

  let values = colorString.replace('rgba(','').replace(')','').split(',');

  if (values.length !== 4) {
    return false;
  }

  if (parseInt(values[0]) > 255 || parseInt(values[0]) < 0 ||
      parseInt(values[1]) > 255 || parseInt(values[1]) < 0 ||
      parseInt(values[2]) > 255 || parseInt(values[2]) < 0 ||
      parseFloat(values[3]) > 1) {
        return false;
      }

  let valuesObject = {
    'R' : parseInt(values[0]),
    'G' : parseInt(values[1]),
    'B' : parseInt(values[2]),
    'alpha' : parseFloat(values[3])
  };

  return valuesObject;

}

exports.rgbParse = function(colorString) {

  let tested = rgbRegex({exact: true }).test(colorString);

  if (!tested) {
    return false;
  }

  let values = colorString.replace('rgb(','').replace(')','').split(',');

  if (values.length !== 3) {
    return false;
  }

  if (parseInt(values[0]) > 255 || parseInt(values[0]) < 0 ||
      parseInt(values[1]) > 255 || parseInt(values[1]) < 0 ||
      parseInt(values[2]) > 255 || parseInt(values[2]) < 0) {
        return false;
      }

  let valuesObject = {
    'R' : parseInt(values[0]),
    'G' : parseInt(values[1]),
    'B' : parseInt(values[2])
  };

  return valuesObject;

}

exports.computeAlphaComposite = function(backdrop, overlay) {

  let result = {
    'R' : Math.round((overlay.R * overlay.alpha) + (backdrop.R * backdrop.alpha * (1 - overlay.alpha))),
    'G' : Math.round((overlay.G * overlay.alpha) + (backdrop.G * backdrop.alpha * (1 - overlay.alpha))),
    'B' : Math.round((overlay.B * overlay.alpha) + (backdrop.B * backdrop.alpha * (1 - overlay.alpha))),
    'alpha' : overlay.alpha + (backdrop.alpha * (1 - overlay.alpha))
  }

  return result;

}

exports.computeOverlayComposite = function(backdrop, result, alpha) {
  let subdivision = alpha;
  let alphaValues = Array.from(Array(subdivision).keys());
  let computedColors = [];

  /*
    (overlay.R * overlay.alpha) + (backdrop.R * backdrop.alpha * (1 - overlay.alpha)) = result.R
    (overlay.R * overlay.alpha) = result.R - (backdrop.R * backdrop.alpha * (1 - overlay.alpha))
    overlay.R = (result.R - (backdrop.R * backdrop.alpha * (1 - overlay.alpha))) / overlay.alpha
  */

  for (var i=0; i < alphaValues.length; i++) {
    let alpha = (alphaValues[i] + 1) / subdivision;
    let overlayColor = {
      'R' : Math.round((result.R - (backdrop.R * backdrop.alpha * (1 - alpha))) / alpha),
      'G' : Math.round((result.G - (backdrop.G * backdrop.alpha * (1 - alpha))) / alpha),
      'B' : Math.round((result.B - (backdrop.B * backdrop.alpha * (1 - alpha))) / alpha),
      'alpha' : alpha
    }
    computedColors.push(overlayColor);
  }

  return computedColors;

}

exports.rgbaToHex = function (colorObject) {

  var outParts = [
    colorObject.R.toString(16),
    colorObject.G.toString(16),
    colorObject.B.toString(16),
    Math.round(colorObject.alpha * 255).toString(16).substring(0, 2)
  ];

  // Pad single-digit output values
  outParts.forEach(function (part, i) {
    if (part.length === 1) {
      outParts[i] = '0' + part;
    }
  })

  return ('#' + outParts.join(''));
}
