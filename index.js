var axios = require('axios');





//-----------------------------------------------------------------------------------------//
//Bitcoin deposit check using Blockcypher
/**
 * 
 * @param {String} address address you are checking
 * @param {String} startTx the Tx hash we are starting the check from
 * @param {*} callBack 
 */
function btcDepositBlockcypher(address, startTx, callBack) {

    var url = "https://api.blockcypher.com/v1/btc/main/addrs/" + address + "?limit=10";

    axios.get(url)
        .then(function (body) {

            //If the address has transactions
            if (body.data.txrefs) {

                if (body.data.txrefs[0].tx_hash == startTx) {//if last tx is the startTx

                    //do something

                } else {//if last tx isn't the startTx

                    //iterate through the fetched tx
                    for (var i = 0; i < body.data.txrefs.length; i++) {

                        //when we've not reach the startTx
                        //operate on the tx
                        if (body.data.txrefs[i].tx_hash != startTx) {


                            if (body.data.txrefs[i].tx_output_n > -1) {//if its a deposit

                                //deposit amount
                                let deposit_amount = body.data.txrefs[i].value / (Math.pow(10, 8));

                                //do something

                                //if it is confirmed (1 confirmation)
                                if (body.data.txrefs[i].confirmations > 0) {

                                    //do something

                                } else {//if not confirmed

                                    //do something

                                }

                            } else {//if not a deposit then continue to the next

                                continue;

                            }

                        } else {//if this is equal to startTx, end the loop
                            break;
                        }
                    }

                }

                return callBack(null, "success")

            } else {
                //no transaction for the address yet
                return callBack(null, "Address has no transactions yet")
            }

        })
        .catch(function (e) {
            return callBack(null, "error")
        });
}
//-----------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------//


