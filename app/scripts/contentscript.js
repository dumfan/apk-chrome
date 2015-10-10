(function () {
  'use strict';

  var detailsList = document.querySelector('.details-list');
  var productHeader = document.querySelector('.product-header');
  var rightCol = document.querySelector('.product-header .right-col');

  if (!productHeader) {
    return;
  }

  var formatAlcohol = function (string) {
    return string.replace(',', '.').replace('%', '').trim();
  };

  var formatVolume = function (volume) {
    return /([0-9]*)\&nbsp;ml$/.exec(volume)[1];
  };

  var formatPrice = function (price) {
    return price.replace(':', '.').replace('-', '0');
  };

  var getApk = function (price, alcohol, volume) {
    var apk = ((alcohol / 100) * volume) / price;
    apk = parseFloat(apk.toFixed(2));

    return apk;
  };

  var updateApkOnProductPage = function () {
    var price = parseFloat(formatPrice(productHeader.querySelector('.price').innerHTML));
    var alcohol = formatAlcohol(/[0-9.,]+[0-9]\s%/.exec(detailsList.innerHTML)[0]);
    var volume = parseFloat(formatVolume(productHeader.querySelector('.packaging').innerHTML));


    var apkListItem = document.createElement('li');
    apkListItem.innerHTML = '<h3>APK</h3><p>' + getApk(price, alcohol, volume) + '</p>';

    detailsList.querySelector('ul').appendChild(apkListItem);

    var apkDetailItem = document.createElement('li');
    apkDetailItem.innerHTML = getApk(price, alcohol, volume) + ' APK';
    rightCol.appendChild(apkDetailItem);
  };

  if (productHeader) {
    updateApkOnProductPage();
  }

}());
