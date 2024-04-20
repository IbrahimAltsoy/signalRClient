import React, { Component } from "react";
import $ from "jquery";
import * as signalR from "@microsoft/signalr";

class App extends Component {
  componentDidMount() {
    $(document).ready(function () {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5049/myhub") // Doğru SignalR hub URL'sini buraya ekleyin
        .build();
      const stateConnection = document.getElementById("stateConnection");
      function animasyon() {
        stateConnection.classList.add("Bağlandı kuruldu");
        setTimeout(function () {
          stateConnection.classList.remove("connected");
        }, 3000);
      }
      connection
        .start()
        .then(() => {
          animasyon();
          // console.log("SignalR bağlantısı başarıyla kuruldu!");
        })
        .catch((error) => {
          console.error("SignalR bağlantısı kurulurken hata oluştu: ", error);
        });

      $("#btnSend").click(function () {
        let message = $("#txtMessage").val();
        connection.invoke("SendMessageAsync", message).catch((error) => {
          console.error("Hata oluştu: " + error.toString());
        });
      });
      //client join
      connection.on("clientJoin", (connectionId) => {
        console.log(connectionId);
      });
      //
      connection.on("clientLeft", (connectionId) => {
        console.log(connectionId);
      });
    });
  }

  render() {
    return (
      <div id="myElement">
        <p>SihnalR Çalışması</p>
        <input type="text" id="txtMessage" />
        <button id="btnSend">Send</button>
        <div id="stateConnection" style={{ display: "none" }}></div>
      </div>
    );
  }
}

export default App;
