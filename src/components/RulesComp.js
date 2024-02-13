import React, {useState, useRef} from 'react';

import '../styles/PopupStyles.css';
import tapSound from '../sounds/ButtonTapSound.wav';


const rulesContent = {
    English:
        "Each participant in turn threads one disc into the board. \n" +
        " The player must try to create a sequence of four pucks in a row, column or diagonal, \n" +
        " and at the same time try to limit the opponent and prevent him from creating a sequence with his pucks. \n" +
        "Each player have 10 seconds to play, Or his turn will past to the opponent \n" +
        " The winner: \n" +
        " the first player to make a sequence of 4 discs of the same color! \n" +
        "Good luck!\n",
    Hebrew:  " חוקי המשחק :" +
        " " +
        "כל משתתף משחיל בתורו דסקית אחת לתוך הלוח. \n" +
        " על השחקן לנסות ליצור רצף של ארבע דסקיות בשורה, בטור או באלכסון, \n" +
        " ובמקביל לנסות לתחום את היריב ולמנוע ממנו ליצור רצף עם הדסקיות שלו.  \n" +
        "לכל שחקן יש 10 שניות לשחק, אחרת התור יעבור אל היריב. \n" +
        "המנצח: השחקן הראשון שהצליח ליצור רצף של 4 דסקיות בצבע זהה. \n" +
        "בהצלחה !",
};


const RulesModal = ({ onClose }) => {
    const [language, setLanguage] = useState('');
    const audioRef = useRef(null);

    const playSound = () => {
        if(!audioRef) {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        }
    };

    const renderRulesText = (text) => {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <audio ref={audioRef} src={tapSound} preload="auto"></audio>
                <button className="close-button" onClick={() => { onClose(); playSound(); }}>X</button>
                {language ? (
                    <>
                        <h2>Game Rules ({language})</h2>
                        <div className="rules-text">
                            {renderRulesText(rulesContent[language])}
                        </div>
                        <button className="menuButtons" onClick={() => { setLanguage(''); playSound(); }}>Back</button>
                        <button className="menuButtons" onClick={() => { onClose(); playSound(); }}>Resume game</button>
                    </>
                ) : (
                    <>
                        <h2>Select Language</h2>
                        <button className="menuButtons" onClick={() => { setLanguage('English'); playSound(); }}>English</button>
                        <button className="menuButtons" onClick={() => { setLanguage('Hebrew'); playSound(); }}>Hebrew</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default RulesModal;