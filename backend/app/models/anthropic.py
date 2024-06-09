from langchain_anthropic import ChatAnthropic

anthropic_model = ChatAnthropic(
    model="claude-3-sonnet-20240229",
    temperature=0,
    max_tokens=1024,
    timeout=None,
    max_retries=2,
)