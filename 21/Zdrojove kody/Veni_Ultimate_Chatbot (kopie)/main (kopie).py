import streamlit as st
import requests

API_URL = "http://3.72.8.201:3000/api/v1/prediction/7394c2f5-1b23-4a6a-9c6b-2edb5097fd9f"

st.title("Super Ultime KHK Chatbot")

st.markdown("""
<style>
    .stChatMessageScrollable {
        flex-direction: column-reverse;
        overflow-y: auto;
        max-height: 400px; /* Set a maximum height for the chat window */
    }
    .st-chat-message.user {
        order: 1; /* Place user's message at the bottom */
    }
    .st-chat-message.assistant {
        order: -1; /* Place assistant's message at the top */
    }
    .st-markdown.user {
        order: 2; /* Place the user prompt at the bottom */
    }
</style>
""", unsafe_allow_html=True)

def query(payload):
    response = requests.post(API_URL, json=payload)
    return response.json()

if "messages" not in st.session_state:
    st.session_state.messages = []

#st.markdown("#")

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

if user_input := st.text_input("Ty:"):
    payload = {
        "question": user_input,
        "context": "You are a useful assistant who answers citizens questions only in czech language",
        "language": "cs"
        #"context": "Jsi chatbot, který odpovídá pouze v češtině"

    }

    bot_response = query(payload)

    st.session_state.messages.append({"role": "user", "content": user_input})

    st.session_state.messages.append({"role": "assistant", "content": bot_response})

    with st.chat_message("assistant"):
        st.write(bot_response)

    with st.chat_message("user"):
        st.markdown(user_input)
