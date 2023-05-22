
import React, { useState } from 'react'
import axios from 'axios'

// önerilen başlangıç stateleri
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 //  "B" nin bulunduğu indexi
const theGrid =[
  "(1, 1)",
  "(2, 1)",
  "(3, 1)",
  "(1, 2)",
  "(2, 2)",
  "(3, 2)",
  "(1, 1)",
  "(2, 2)",
  "(3, 3)",
];
export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

 const [coordState,setCoordState] =useState(initialIndex);
 const [steps,setSteps] = useState(initialSteps);
 const [message,setMessage] = useState(initialMessage);
 const [theEmail,settheEmail] = useState(initialEmail);




  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    return theGrid[coordState];
  }

  function getXYMesaj(yon) {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    
    if(yon=="left") {
      setMessage("Sola Gidemezsiniz!");
    }else if(yon =="up"){
      setMessage("Yukarıya Gidemezsiniz!")
    }else if(yon=="right"){
      setMessage("Sağa Gidemezsiniz!");
    }else if(yon=="down"){
      setMessage("Aşağıya Gidemezsiniz!")
    }
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.

    console.log("reset zamanı");
    setSteps(initialSteps);
    setCoordState(initialIndex);
    settheEmail(initialEmail);
    setMessage(initialMessage);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.

    if(yon=="left"){
      setMessage("Sola gidemezsiniz");
    }else if(yon =="up"){
      setMessage("Yukarıya gidemezsiniz");
    }else if(yon=="right"){
      setMessage("Sağa gidemezsiniz");
    }else if(yon=="down"){
      setMessage("Aşağıya gidemezsiniz");
    }
  }


  function ilerle(yon) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    if(yon=="left"&& !(coordState % 3 == 0)){
      setSteps(steps+1);
      setCoordState(coordState - 1);
    }else if(yon=="up"&& coordState / 3 >=1){
    setSteps(steps+1);
    setCoordState(coordState - 3);
    }else if(yon=="right"&&!(coordState%3 ==2)){
      setSteps(steps+1);
      setCoordState(coordState + 1);
    }else if(yon=="down"&& coordState / 3 <2){
      setSteps(steps+1);
      setCoordState(coordState + 3);
    }else getXYMesaj(yon);
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    settheEmail(evt.target.Value);
    if (!/\S+@\S+\.\S+/.test(evt.target.value)) {
      setMessage("Oops: email must be a valid email");
    } else {
      setMessage("");
    }
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();

    const theData ={
      x:theGrid[coordState][1],
      y:theGrid[coordState][4],
      steps:steps,
      email:theEmail,
    };
    settheEmail(initialEmail);

    const config = {
      method:"post",
      url:"http://localhost:9000/api/result",
      Headers:{
        "Content-Type":"application/json",
      },
      data:theData,
    };
    axios(config)
    .then(function (response) {
      setMessage(response.data.message);
  })
  .catch(function (error) {
    setMessage(error.response.data.message);
  });
}
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar {getXY()} </h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div key={idx} className={`square${idx === coordState ? ' active' : ''}`}>
              {idx === coordState ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={(e)=> ilerle(e.target.id)} id="left">SOL</button>
        <button onClick={(e)=> ilerle(e.target.id)} id="up">YUKARI</button>
        <button onClick={(e)=> ilerle(e.target.id)} id="right">SAĞ</button>
        <button onClick={(e)=> ilerle(e.target.id)} id="down">AŞAĞI</button>
        <button onClick={()=> reset()} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" 
        type="email"
         placeholder="email girin"
          onChange={(e)=> onChange(e)}
           value={theEmail}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
 }