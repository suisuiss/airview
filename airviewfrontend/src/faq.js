import React, { useState } from "react";
const Faq =()=>{
    const faqItems = [
        { question: "What is feel like temperature, and why is it different from the actual temperature?"
        , answer: "The feel like temperature accounts for factors such as humidity and wind, providing a more accurate representation of how the weather actually feels to a person." },
        { question:" What is the Air Quality Index (AQI), and why is it important?" 
        , answer: "The Air Quality Index (AQI) measures air quality in a specific location, helping you understand how clean or polluted the air is and the associated health risks."},
        {question : "What are PM2.5 and PM10, and how do they impact air quality and health?"
        ,answer:<span> PM2.5 (Particulate Matter 2.5) refers to particles in the air with a diameter of 2.5 micrometers or smaller. These particles are extremely fine and can be inhaled deep into the respiratory system. They often originate from sources like vehicle emissions, industrial processes, and combustion, and can contain harmful substances. <br/><br/>
         PM10 (Particulate Matter 10) refers to slightly larger particles with a diameter of 10 micrometers or smaller. While still small, they are not as fine as PM2.5. Sources of PM10 include dust, pollen, and mold spores. <br/><br/> 
         Impact on Air Quality and Health: When PM2.5 and PM10 levels are high, they can have adverse effects on air quality and human health. PM2.5, due to its smaller size, is particularly concerning as it can penetrate deep into the lungs and even enter the bloodstream. Prolonged exposure to elevated levels of PM2.5 can lead to respiratory and cardiovascular problems, including aggravated asthma, bronchitis, and increased risk of heart attacks. PM10, although not as fine, can still irritate the respiratory system and worsen existing conditions like asthma.
</span>},
        { question : "What is humidity, and how does it affect our bodies? "
        ,answer:<span>Humidity refers to the amount of moisture or water vapor present in the air. It's commonly measured as relative humidity, which is expressed as a percentage and represents the ratio of the amount of water vapor in the air to the maximum amount the air can hold at a given temperature.
          <br/><br/>Effects on the Body: Humidity can significantly impact our bodies, particularly in terms of comfort and health. When the humidity is too high, it can make us feel warmer than the actual temperature because our bodies have a harder time cooling through the evaporation of sweat. This can lead to discomfort, especially in hot and humid conditions.</span>},
        { question: "What is ideal humidity for human body?", answer: "Idea humidity are between 40-60 %" },
        {question : "What is rainfall on the dashboard, and why is it important?"
        ,answer: "Rainfall on the dashboard shows how much rain has fallen in a specific area. It's important because it helps us understand the weather, its impact on agriculture, and the risk of flooding."},
        {question : "What is WBGT, and how does it assess heat-related risks in weather?"
        ,answer: "WBGT (Wet Bulb Globe Temperature) considers temperature, humidity, wind, and solar radiation to measure the risk of heat stress during hot weather. It helps determine the safety of outdoor activities and working in high-temperature conditions."},
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