import React, { useState } from "react";
const Faq =()=>{
    const faqItems = [
        { question: "What is AQI ?", answer: "AQI is ...." },
        { question: "What is ideal humidity ?", answer: "Idea humidity are between 40-60 %" },
      ];
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null); // Collapse if clicked again
    } else {
      setActiveIndex(index);
    }
  };
    return(
        <div>
        <div className="faq"> 
             <div style={{ width:"100%",display:'flex'}}>
             <span className="faq-header">FAQ</span>
             </div>
        <div className="q-list">
        {faqItems.map((item, index) => (
          <div className="q-item" key={index}>
            <div
              className={`question ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleAnswer(index)}
              style={{ display:"flex", justifyContent:"space-between"}}
            >
             <span> {item.question} </span>  
             <span style={{ position:'sticky'}}>{activeIndex === index ? "-" : "+"}</span>
            </div>
            {activeIndex === index && (
              <div className="answer">
            <span style={{ fontWeight:'700'}}> Answer : </span> {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

        </div>
        </div>
    )
}

export default Faq;