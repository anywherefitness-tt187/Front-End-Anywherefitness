import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

export default class PayPalExpressCheckout extends React.Component {
    render() {
        return (
          <PayPalButton
            amount="19.99"
            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
            onSuccess={(details, data) => {
              alert("Transaction completed by " + details.payer.name.given_name);
     
              // OPTIONAL: Call your server to save the transaction
              return fetch("/paypal-transaction-complete", {
                method: "post",
                body: JSON.stringify({
                  orderId: data.orderID
                })
              });
            }}
            options={{
              clientId: "ATbqzBLCskokQpH8iFOoxFEaVs610QZbvuKBClcvq0y3Dl86verWjNVCXQqd0RhvsqQCNO9zzWbyyRWW"
            }}
          />
        );
      }
    }