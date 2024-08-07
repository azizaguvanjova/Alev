import { useEffect, useState } from "react";
import Fire from "./components/Fire";
import Torch from "./components/Torch";
import runBackgroundEffects from "./utilities/runBackgroundEffects";
import "./styles.css";

export default function App() {
  const [torchEquipped, setTorchEquipped] = useState(false);
  const [woodKindling, setWoodKindling] = useState(false);
  const [woodOnFire, setWoodOnFire] = useState(false);
 

  /*----- ❌ ⬇️ Aşağıdaki kodlar hakkında endişelenmenize gerek yok! ❌ ⬇️️ ️----------- */

  const [cursorPosition, setCursorPosition] = useState({ x: null, y: null });
  const kindleClass = woodKindling && !woodOnFire && "kindle";

  runBackgroundEffects(
    torchEquipped,
    woodOnFire,
    setWoodKindling,
    setWoodOnFire,
    setCursorPosition
  );

  let torchStyle = {
    position: "absolute",
    left: cursorPosition.x - 10,
    top: cursorPosition.y - 60
  };
  /*----------------------------------------------------------------- */

  /* Challenge:

	Kullanıcının meşaleyi alıp odunları yakmak için kullanabilmesi gerekiyor. Göreviniz aşağıdakileri yapmalarına sağlamaktır:  
  
      1. TorchEquipped state'i, kullanıcının mouse tuşuna bastığı anda ve "torch-container" div'inin içinde herhangi bir
       yerdeyken true olarak ayarlanmalıdır (satır 53). 
      
      2. Kullanıcının mouse tuşu yukarıdayken torchEquipped state false olarak ayarlanmalı ve imleçleri "wrapper"
       div'inin içinde herhangi bir yerdedir (satır 51).
      
      3. Aşağıdaki koşulların *hepsi* gerçekleştiğinde woodKindling state'i true olarak belirlenmelidir : 
          - torchEquipped true  ise
          - Kullanıcının imleci "wood-container" div'ine girdi (satır 60)
        
      4. Aşağıdaki koşulların *hepsi* karşılandığında woodOnFire state true olarak ayarlanmalıdır:
          - torchEquipped true ise
          - woodKindling true ise
          - Kullanıcının imleci "wood-container" div'inden ayrıldı (satır 60) 
  */


          useEffect(() =>{
            function handleMouseDown(event){
              if(event.target.closest('.torch-container')){
                setTorchEquipped(true);
              }
            }

            function handleMouseUp(event){
              if(event.target.closest('.wrapper')){
                setTorchEquipped(false);
              }
            }
            function handleMouseMove(event){
              if(torchEquipped){
                setWoodKindling(true)
              }
            }
            function handleMouseLeave(event){
              if(torchEquipped && woodKindling){
                setWoodOnFire(true);
              }
            }

            document.addEventListener("mousedown", handleMouseDown)
            document.addEventListener("mouseup", handleMouseUp)
            document.querySelector(".wood-container").addEventListener("mouseenter",handleMouseMove)
            document.querySelector(".wood-container").addEventListener("mouseleave",handleMouseLeave)

            return ()=>{
              document.removeEventListener("mousedown", handleMouseDown)
              document.removeEventListener("mouseup", handleMouseUp)
              document.querySelector(".wood-container").removeEventListener("mouseenter",handleMouseMove)
              document.querySelector(".wood-container").removeEventListener("mouseleave",handleMouseLeave)
            }

          },[torchEquipped,woodKindling])
  return (
    <div className={`wrapper ${torchEquipped && "relative no-cursor"}`}>
      <div className={`game-area ${!torchEquipped && "relative"}`}>
        <div
          className={`torch-container ${torchEquipped && "torch-equipped"}`}
          style={torchEquipped ? torchStyle : null}
        >
          <Torch />
        </div>

        <div className={`wood-container ${kindleClass}`}>
          🪵
          <Fire woodOnFire={woodOnFire} />
        </div>
      </div>
    </div>
  );
}
