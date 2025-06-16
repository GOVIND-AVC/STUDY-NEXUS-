const {GoogleGenerativeAi}=require('@google/generative-ai');

const genAI = new GoogleGenerativeAi(process.env.GEMINI_API_KEY);

const evaluateAnswerWithGemini=async(question,answer)=>{

    try{
        const model=genAI.getGenerativeModel({model:'gemini-pro'});

        const prompt=`Evaluate the following answer for this question given , Return a score out of 10
        based on how appropriate the answer is for the asked question, it can based on how the conceptual understanding is given in the answer
        or how relevant and thoughtful the answer is like that.
        
        Question:${question}
        Answer:${answer}
        
        Respond in the format: "Score: X , where the X is a number representing the score from 0 to 10`;

        const result=await model.generateContent(prompt);
        const respose=await result.respose.text();

        const match=respose.match(/Score:\s*(\d+)/i);
        if(match){
            const score=parseInt(match[1]);
            return score;
        }
        else{
            throw new Error("Could not parse scores from gemini response");
        }
    }
    catch(err){
        console.log("Gemini evaluation error: ",err)
        return null;
    }
}

module.exports=evaluateAnswerWithGemini