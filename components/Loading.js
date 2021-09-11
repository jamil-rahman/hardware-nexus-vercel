import React from 'react'

export default function Loading() {
    return (
        // <h2>Loading, please wait...</h2>

        <div className= "position-fixed w-100 h-100 text-center loading"
        style={{background:"#0008", color: "white", top: "0", left: "0", zIndex:"9" }}>
            <svg width="205" height="205" viewBox=" 0 0 40 50">
                <polygon strokeWidth='1' stroke="#fff" fill="none" points="20,1 40,40 1,40"></polygon>
                <text fill="#fff" x="5" y="45">Loading</text>
            </svg>


        </div>
    )
}
