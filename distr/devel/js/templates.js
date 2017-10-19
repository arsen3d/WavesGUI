angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dex/asset.picker.component',
    "<md-autocomplete class=\"assets-autocomplete\" ng-class=\"{amount: $ctrl.type === 'amountAsset', price: $ctrl.type === 'priceAsset'}\" placeholder=\"Choose an asset or copy-paste an ID here\" md-menu-class=\"assets-autocomplete-popup\" md-selected-item=\"$ctrl.autocomplete.selectedAsset\" md-selected-item-change=\"$ctrl.changeAsset()\" md-search-text=\"$ctrl.autocomplete.searchText\" md-search-text-change=\"\" md-items=\"item in $ctrl.findAssets($ctrl.autocomplete.searchText)\" md-item-text=\"item.displayName\" md-clear-button=\"false\" md-no-cache=\"true\" md-min-length=\"0\" md-has-not-found=\"true\" md-select-on-focus><md-item-template><div class=\"asset-tile\"><span class=\"label\" ng-class=\"{'verified': item.verified}\" md-highlight-text=\"$ctrl.autocomplete.searchText\" title=\"{{item.verified ? 'Asset is verified' : ''}}\">{{item.verified ? item.displayName : ''}}</span> <span class=\"muted\">{{item.id}}</span></div></md-item-template><md-not-found><span ng-if=\"$ctrl.isAssetLoading\">Loading...</span> <span ng-if=\"!$ctrl.isAssetLoading\">Nothing is found!</span></md-not-found></md-autocomplete>"
  );


  $templateCache.put('dex/chart.component',
    "<div class=\"chart\"></div>"
  );


  $templateCache.put('dex/component',
    "<div class=\"exchange\"><div class=\"choice\"><div class=\"picker-widget\"><waves-dex-asset-picker name=\"Amount asset\" type=\"amountAsset\" assets=\"$ctrl.assetsList\" hidden-asset=\"$ctrl.pair.priceAsset\" picked-asset=\"$ctrl.pair.amountAsset\"></waves-dex-asset-picker></div><div class=\"current-pair\">{{$ctrl.pair.amountAsset.shortName}}/{{$ctrl.pair.priceAsset.shortName}}</div><div class=\"picker-widget\"><waves-dex-asset-picker name=\"Price asset\" type=\"priceAsset\" assets=\"$ctrl.assetsList\" hidden-asset=\"$ctrl.pair.amountAsset\" picked-asset=\"$ctrl.pair.priceAsset\"></waves-dex-asset-picker></div></div><div class=\"charts\"><waves-dex-chart pair=\"$ctrl.pair\"></waves-dex-chart></div><div class=\"workplace\"><div class=\"orderbooks\"><div class=\"orderbook\"><waves-dex-orderbook type=\"buy\" name=\"{{$ctrl.pair.amountAsset.displayName}} buy orders\" pair=\"$ctrl.pair\" on-click=\"$ctrl.fillSellForm\" orders=\"$ctrl.buyOrders\"></waves-dex-orderbook></div><div class=\"orderbook\"><waves-dex-orderbook type=\"sell\" name=\"{{$ctrl.pair.amountAsset.displayName}} sell orders\" pair=\"$ctrl.pair\" on-click=\"$ctrl.fillBuyForm\" orders=\"$ctrl.sellOrders\"></waves-dex-orderbook></div><div class=\"orderbook\"><waves-dex-history pair=\"$ctrl.pair\" trades=\"$ctrl.tradeHistory\"></waves-dex-history></div></div><div class=\"user-orders\"><waves-dex-order-creator pair=\"$ctrl.pair\" submit=\"$ctrl.createOrder\" last-price=\"$ctrl.lastTradePrice\" buy-values=\"$ctrl.buyFormValues\" sell-values=\"$ctrl.sellFormValues\"></waves-dex-order-creator><waves-dex-user-orders pair=\"$ctrl.pair\" orders=\"$ctrl.userOrders\" cancel-order=\"$ctrl.cancelOrder\"></waves-dex-user-orders></div></div></div><aside class=\"pairs-lists\"><waves-dex-favorites pairs=\"$ctrl.favoritePairs\" switch-pair=\"$ctrl.changePair\"></waves-dex-favorites><div class=\"how-to\"><h3>Quick guide</h3><p>1. Choose a pair of assets you want to trade. Just start typing asset name, then pick the right one.</p><p>2. Take a look at orderbooks to get an understanding of the pair market.</p><p>3. Finally, fill the form and submit your order.</p></div></aside><div id=\"dex-bad-order-confirmation\" waves-dialog ok-button-caption=\"YES\" on-dialog-ok=\"$ctrl.placeBadOrder()\" cancel-button-caption=\"NO\" on-dialog-cancel=\"$ctrl.refuseBadOrder()\"><div class=\"dialog-confirmation\"><p class=\"dialog-text\">{{$ctrl.badOrderQuestion}}</p></div></div>"
  );


  $templateCache.put('dex/favorites.component',
    "<h2>Favorites</h2><div class=\"pairs-list\"><div class=\"pair\" ng-repeat=\"p in $ctrl.pairs\" ng-click=\"$ctrl.onClick(p)\">{{p.amountAsset.shortName}}/{{p.priceAsset.shortName}}</div></div>"
  );


  $templateCache.put('dex/history.component',
    "<h3>Trade history</h3><table><thead><tr><td>Date</td><td>Type</td><td>Price ({{$ctrl.pair.priceAsset.shortName}})</td><td>Amount ({{$ctrl.pair.amountAsset.shortName}})</td><td>Total ({{$ctrl.pair.priceAsset.shortName}})</td></tr></thead></table><waves-scrollbox><table><tbody><tr ng-repeat=\"trade in $ctrl.trades\"><td>{{trade.timestamp | formatting}}</td><td class=\"type\" ng-class=\"trade.type\">{{trade.typeTitle}}</td><td>{{trade.price | number:$ctrl.pair.priceAsset.precision}}</td><td>{{trade.amount | number:$ctrl.pair.amountAsset.precision}}</td><td>{{trade.total | number:$ctrl.pair.priceAsset.precision}}</td></tr><tr ng-if=\"!$ctrl.trades.length\"><td colspan=\"5\"><span>There was no trades for the current pair.</span></td></tr></tbody></table></waves-scrollbox>"
  );


  $templateCache.put('dex/order.creator.component',
    "<div class=\"half buy\"><h2><span>Buy {{$ctrl.pair.amountAsset.displayName}} </span><small ng-click=\"$ctrl.buyFullBalance()\">{{$ctrl.priceAssetBalance}}</small></h2><div class=\"fields\"><md-input-container><label>Price in {{$ctrl.pair.priceAsset.displayName}}</label><input type=\"text\" ng-model=\"$ctrl.buy.price\" ng-change=\"$ctrl.updateBuyTotal()\" decimal-input-restrictor></md-input-container><md-input-container><label>{{$ctrl.pair.amountAsset.displayName}} amount</label><input type=\"text\" ng-model=\"$ctrl.buy.amount\" ng-change=\"$ctrl.updateBuyTotal()\" decimal-input-restrictor></md-input-container><div><span>Total:&nbsp;</span> <span>{{$ctrl.buy.total | number:$ctrl.pair.priceAsset.precision}}&nbsp;</span> <span>{{$ctrl.pair.priceAsset.shortName}}</span></div><div><span><abbr title=\"Fee will be taken in the moment of order execution\">Fee</abbr>:&nbsp;</span> <span>{{$ctrl.buy.fee}}</span> <span>WAV</span></div></div><div class=\"button-container\"><button ng-disabled=\"$ctrl.buy.blocked\" ng-click=\"$ctrl.submitBuyOrder()\">Buy</button></div></div><div class=\"half sell\"><h2><span>Sell {{$ctrl.pair.amountAsset.displayName}} </span><small ng-click=\"$ctrl.sellFullBalance()\">{{$ctrl.amountAssetBalance}}</small></h2><div class=\"fields\"><md-input-container><label>Price in {{$ctrl.pair.priceAsset.displayName}}</label><input type=\"text\" ng-model=\"$ctrl.sell.price\" ng-change=\"$ctrl.updateSellTotal()\" decimal-input-restrictor></md-input-container><md-input-container><label>{{$ctrl.pair.amountAsset.displayName}} amount</label><input type=\"text\" ng-model=\"$ctrl.sell.amount\" ng-change=\"$ctrl.updateSellTotal()\" decimal-input-restrictor></md-input-container><div><span>Total:&nbsp;</span> <span>{{$ctrl.sell.total | number:$ctrl.pair.priceAsset.precision}}&nbsp;</span> <span>{{$ctrl.pair.priceAsset.shortName}}</span></div><div><span><abbr title=\"Fee will be taken in the moment of order execution\">Fee</abbr>:&nbsp;</span> <span>{{$ctrl.sell.fee}}</span> <span>WAV</span></div></div><div class=\"button-container\"><button ng-disabled=\"$ctrl.sell.blocked\" ng-click=\"$ctrl.submitSellOrder()\">Sell</button></div></div>"
  );


  $templateCache.put('dex/orderbook.component',
    "<h3>{{$ctrl.name}}</h3><table ng-class=\"$ctrl.type\"><thead><tr><td>Price</td><td>{{$ctrl.pair.amountAsset.shortName}}</td><td>{{$ctrl.pair.priceAsset.shortName}}</td><td>SUM ({{$ctrl.pair.priceAsset.shortName}})</td></tr></thead></table><waves-scrollbox><table ng-class=\"$ctrl.type\"><tbody><tr ng-repeat=\"order in $ctrl.orders\" ng-click=\"$ctrl.lineClick($index)\"><td ng-bind-html=\"order.price | number:$ctrl.pair.priceAsset.precision | padder:$ctrl.lengths.price\"></td><td ng-bind-html=\"order.amount | number:$ctrl.pair.amountAsset.precision | padder:$ctrl.lengths.amount\"></td><td ng-bind-html=\"order.total | number:$ctrl.pair.priceAsset.precision | padder:$ctrl.lengths.total\"></td><td ng-bind-html=\"order.sum | number:$ctrl.pair.priceAsset.precision | padder:$ctrl.lengths.sum\"></td></tr><tr ng-if=\"!$ctrl.orders.length\"><td colspan=\"4\"><span>Some orders will appear soon.</span></td></tr></tbody></table></waves-scrollbox>"
  );


  $templateCache.put('dex/pair.chart.component',
    "<img src=\"http://www.ifmr.co.in/blog/wp-content/uploads/2014/04/BitcoinPrice.png\">"
  );


  $templateCache.put('dex/user.orders.component',
    "<h3>My orders</h3><table class=\"user\"><thead><tr><td>Status</td><td>Type</td><td>Price</td><td>{{$ctrl.pair.amountAsset.shortName}}</td><td>{{$ctrl.pair.priceAsset.shortName}}</td><td></td></tr></thead></table><waves-scrollbox><table class=\"user\"><tbody><tr ng-repeat=\"order in $ctrl.orders\" ng-class=\"{\n" +
    "            'filled': order.status === 'Filled' || order.status === 'Cancelled',\n" +
    "            'not-found': order.status === 'NotFound'\n" +
    "          }\"><td>{{order.statusTitle}}</td><td class=\"type\" ng-class=\"order.type\">{{order.typeTitle}}</td><td>{{order.price | number:8}}</td><td>{{order.amount | number:8}}</td><td>{{order.total | number:8}}</td><td ng-click=\"$ctrl.cancel({order: order})\">&times;</td></tr><tr ng-if=\"!$ctrl.orders.length\"><td colspan=\"6\"><span>Create your first order!</span></td></tr></tbody></table></waves-scrollbox>"
  );


  $templateCache.put('leasing/balance.details.component',
    "<section-header>BALANCE DETAILS</section-header><table class=\"waves-table\"><tbody><tr><td>Regular</td><td>{{$ctrl.formattedBalance.regular}}</td></tr><tr><td>Effective</td><td>{{$ctrl.formattedBalance.effective}}</td></tr><tr><td>Generating</td><td>{{$ctrl.formattedBalance.generating}}</td></tr></tbody></table>"
  );


  $templateCache.put('leasing/component',
    "<div class=\"leasing\"><div class=\"tools\"><div class=\"column balance\"><waves-leasing-balance-details balance-details=\"$ctrl.balanceDetails\"></waves-leasing-balance-details></div><div class=\"column form\"><waves-leasing-lease-form></waves-leasing-lease-form></div><div class=\"column quick-note\"><section-header>QUICK NOTE</section-header><p>You can only transfer or trade Waves that aren’t leased. The leased amount cannot be transferred or traded by you or anyone else.</p><p>You can cancel a leasing transaction as soon as it appears in the blockchain which usually occurs in a minute or less.</p><p>To cancel a lease, click on the black button in the far right column of the Leasing Transactions table below and select Cancel Leasing.</p><p>The generating balance will be updated after 1000 blocks.</p></div></div><waves-transaction-history heading=\"LEASING TRANSACTIONS\" transactions=\"$ctrl.transactions\" limit-to=\"$ctrl.limitTo\"></waves-transaction-history></div>"
  );


  $templateCache.put('leasing/lease.form.component',
    "<section-header>BALANCE LEASING</section-header><form name=\"$ctrl.form\" novalidate ng-validate=\"$ctrl.validationOptions\"><table><tbody><tr><td>Recipient</td><td><input class=\"wInput form-control\" name=\"leasingRecipient\" type=\"text\" placeholder=\"Recipient address\" ng-model=\"$ctrl.recipient\"></td></tr><tr><td>Amount</td><td><input class=\"wInput form-control\" name=\"leasingAmount\" type=\"text\" placeholder=\"Leasing amount\" ng-model=\"$ctrl.amount\" decimal-input-restrictor></td></tr><tr><td class=\"padded\">Fee</td><td class=\"padded padded-more\"><md-autocomplete md-input-name=\"leasingFee\" md-selected-item=\"$ctrl.autocomplete.selectedFee\" md-search-text=\"$ctrl.autocomplete.searchText\" md-items=\"item in $ctrl.autocomplete.querySearch($ctrl.autocomplete.searchText)\" md-item-text=\"item.amount.toString()\" md-min-length=\"0\" md-require-match=\"\" md-no-cache=\"true\" md-menu-class=\"popup-autocomplete\" class=\"fee-autocomplete\"><md-item-template><span md-highlight-text=\"$ctrl.autocomplete.searchText\">{{item.displayText}}</span></md-item-template></md-autocomplete></td></tr><tr><td colspan=\"2\" class=\"button-container\">Please change fees only if you know what you're doing!</td></tr><tr><td colspan=\"2\" class=\"button-container\"><button class=\"wButton wButton-neg fade\" ng-click=\"$ctrl.confirmLease($ctrl.form)\">LEASE</button></td></tr></tbody></table></form><div id=\"start-leasing-confirmation\" waves-dialog ok-button-caption=\"CONFIRM\" ok-button-enabled=\"!$ctrl.broadcast.pending\" on-dialog-ok=\"$ctrl.broadcastTransaction()\"><div class=\"dialog-confirmation\"><p class=\"dialog-text\">You are going to lease <span class=\"confirmation-value\">{{$ctrl.confirm.amount | moneyLong:true}}</span> with <span class=\"confirmation-value\">{{$ctrl.confirm.fee | moneyLong:true}}</span> fee to the address<br><span class=\"confirmation-value\">{{$ctrl.confirm.recipient}}</span></p><p class=\"dialog-text\">Please <span class=\"fontBold\">CONFIRM </span>to execute or <span class=\"fontBold\">CANCEL </span>to discard.</p></div></div>"
  );


  $templateCache.put('navigation/tab.directive',
    "<img ng-src=\"img/tabs-iconset-{{pageId}}.svg\" class=\"fFade\" alt=\"{{caption}}\" ng-click=\"onClick()\" ng-class=\"[{selected: isSelected()}]\">"
  );


  $templateCache.put('shared/dialog.directive',
    "<img class=\"wPop-header\" ng-src=\"img/{{image}}\"><div class=\"wavesPop-content\" ng-transclude></div><div class=\"wavesPop-content-buttons button-row\" ng-show=\"showButtons\"><button class=\"wButton wButton-dialog fade tooltip-1\" ng-class=\"[{wButtonDanger: isError}]\" title=\"{{::tooltip}}\" ng-click=\"onOk()\" ng-disabled=\"!okButtonEnabled\">{{::okButtonCaption}}</button> <span class=\"divider-2\" ng-if=\"cancelButtonVisible\"></span> <button ng-if=\"cancelButtonVisible\" class=\"wButton wButton-dialog fade\" ng-class=\"[{wButtonDanger: isError}]\" ng-click=\"onCancel()\">{{::cancelButtonCaption}}</button><waves-support-link ng-if=\"::!noSupportLink\" class=\"dark\"></waves-support-link></div>"
  );


  $templateCache.put('shared/transaction.history.component',
    "<section-header>{{::$ctrl.heading}}</section-header><waves-scrollbox class=\"transactions-table\"><table><thead><tr><td>DATE</td><td>TYPE</td><td>NAME</td><td>SENDER</td><td>RECIPIENT</td><td>FEE</td><td>UNITS</td><td></td></tr></thead><tbody><tr ng-repeat=\"tx in $ctrl.transactions | orderBy:'timestamp':true | limitTo:$ctrl.limitTo | transaction track by tx.timestamp\" ng-class=\"{'tx-unc': tx.unconfirmed, 'tx-in': !tx.formatted.isOutgoing, 'tx-out': tx.formatted.isOutgoing}\"><td>{{tx.formatted.datetime}}</td><td>{{tx.formatted.type}}</td><td>{{tx.formatted.asset}}</td><td>{{tx.formatted.sender}}</td><td>{{tx.formatted.recipient}}</td><td>{{tx.formatted.fee}} {{tx.formatted.feeAsset.shortName}}</td><td>{{tx.formatted.amount}}</td><td width=\"16\"><tx-menu transaction=\"tx\"></tx-menu></td></tr></tbody></table><div id=\"cancel-leasing-confirmation\" waves-dialog ok-button-caption=\"CONFIRM\" on-dialog-ok=\"$ctrl.cancelLeasing($ctrl.form)\"><div class=\"dialog-confirmation\"><p class=\"dialog-text\">You are going to cancel leasing of <span class=\"confirmation-value\">{{$ctrl.confirm.amount}}</span> <span class=\"confirmation-value\">{{$ctrl.confirm.asset}}</span><br>for the address <span class=\"confirmation-value\">{{$ctrl.confirm.recipient}}</span></p><form name=\"$ctrl.form\" novalidate ng-validate=\"$ctrl.validationOptions\"><table><tbody><tr><td>Waves fee</td><td><md-autocomplete md-input-name=\"cancelFee\" md-selected-item=\"$ctrl.autocomplete.selectedFee\" md-search-text=\"$ctrl.autocomplete.searchText\" md-items=\"item in $ctrl.autocomplete.querySearch($ctrl.autocomplete.searchText)\" md-item-text=\"item.amount.toString()\" md-min-length=\"0\" md-require-match=\"\" md-no-cache=\"true\" md-menu-class=\"popup-autocomplete\" class=\"fee-autocomplete\"><md-item-template><span md-highlight-text=\"$ctrl.autocomplete.searchText\">{{item.displayText}}</span></md-item-template></md-autocomplete></td></tr></tbody></table></form><p class=\"dialog-text\">Please <span class=\"fontBold\">CONFIRM </span>to execute or <span class=\"fontBold\">CANCEL </span>to discard.</p></div></div></waves-scrollbox>"
  );


  $templateCache.put('shared/transaction.menu.component',
    "<md-menu><md-button class=\"md-icon-button\" ng-click=\"$mdMenu.open($event)\"><img ng-src=\"img/wicon_txmenu.svg\" height=\"16\" width=\"16\"></md-button><md-menu-content width=\"2\"><md-menu-item><md-button ngclipboard data-clipboard-text=\"{{::$ctrl.transaction.sender}}\" ngclipboard-success=\"$ctrl.addressCopied()\"><span md-menu-align-target>Copy sender address</span></md-button></md-menu-item><md-menu-item><md-button ng-disabled=\"!$ctrl.hasRecipient()\" ngclipboard data-clipboard-text=\"{{::$ctrl.transaction.recipient}}\" ngclipboard-success=\"$ctrl.addressCopied()\"><span md-menu-align-target>Copy recipient address</span></md-button></md-menu-item><md-menu-item><md-button ngclipboard data-clipboard-text=\"{{::$ctrl.transaction.id}}\" ngclipboard-success=\"$ctrl.idCopied()\"><span md-menu-align-target>Copy TX ID</span></md-button></md-menu-item><md-menu-item><md-button ngclipboard ngclipboard-text-provider=\"$ctrl.fullTransactionData()\" ngclipboard-success=\"$ctrl.dataCopied()\"><span md-menu-align-target>Copy full TX data</span></md-button></md-menu-item><md-menu-item ng-if=\"$ctrl.isLeasing()\"><md-button ng-click=\"$ctrl.cancelLeasing()\"><span md-menu-align-target>Cancel Leasing</span></md-button></md-menu-item></md-menu-content></md-menu>"
  );


  $templateCache.put('wallet/box.component',
    "<img ng-src=\"img/{{::$ctrl.image}}\" alt=\"{{::$ctrl.displayName}}\"><div class=\"wB-name\">{{::$ctrl.displayName | uppercase}}</div><div class=\"wB-add\"></div><div class=\"wB-balInt\">{{$ctrl.integerBalance}}</div><div class=\"wB-balDec\">{{$ctrl.fractionBalance}}</div><div class=\"wB-buttons\"><a ng-click=\"$ctrl.onSend({currency: $ctrl.balance.currency})\"><div class=\"wB-but wB-butSend fade\"><p>SEND</p></div></a><a ng-click=\"$ctrl.onWithdraw({currency: $ctrl.balance.currency})\"><div class=\"wB-but wB-butRec fade\"><p>WITHDRAW</p></div></a><a ng-click=\"$ctrl.onDeposit({currency: $ctrl.balance.currency})\"><div class=\"wB-but wB-butTrade fade\"><p>DEPOSIT</p></div></a></div>"
  );

}]);
