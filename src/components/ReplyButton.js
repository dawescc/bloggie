import React, { useState, useEffect } from "react";

const ReplyButton = ({ onReplyClick, ArticleID }) => {

	return (
        <div className='py-1 px-2 cursor-pointer hover:bg-white hover:bg-opacity-20'
            onClick={() => onReplyClick(ArticleID)}>
            <span className="flex items-center justify-center content-center"><i className='fa-solid fa-reply'></i>&nbsp;Reply</span>
        </div>
	);
};

export default ReplyButton;
