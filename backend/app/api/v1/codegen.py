# backend/app/api/v1/codegen.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.config import settings
from langchain_anthropic import ChatAnthropic
from langchain.prompts import PromptTemplate
import app.prompts as prompts
import app.models.anthropic as anthropic


router = APIRouter()

# Initialize Anthropic LLM with API key
llm = anthropic.anthropic_model

# Define the request body for type safety
class Question(BaseModel):
    question: str

@router.post("/generate-code")
async def generate_code(question: Question):

    try:
        # Generate prompt using the template
        messages = [
            ("system", prompts.system_prompt),
            ('user', question.question),
        ]
        
        # Get the response from the LLM
        response = llm.invoke(messages,extra_headers={})
    
        result = response.content
        
        if response.response_metadata["usage"]["output_tokens"] <= 4 :
            return HTTPException(status_code=400, detail="Please ask a relevant JavaScript question.")
        
        code, explanation = result.split('\n', 1)


        return {"code": code, "explanation": explanation}
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)
