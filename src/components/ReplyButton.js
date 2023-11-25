import React, { useState, useEffect } from "react";

const ReplyButton = ({ onReplyClick, ArticleID }) => {

	return (
        <span className='py-1 px-2 flex items-center justify-center content-center cursor-pointer hover:bg-white hover:bg-opacity-20'
            onClick={() => onReplyClick(ArticleID)}>
            <i className='fa-solid fa-reply'></i>
        </span>
	);
};

export default ReplyButton;
