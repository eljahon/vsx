import userimg from "../../../../assets/images/user.png";
import React from "react";
export   const Avatar = (src) => src ? <img className='user__avatar' src={`${process.env.REACT_APP_IMAGE_BASE_URL}${src}`}/> : <img className='user__avatar' src={userimg} />
