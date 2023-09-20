import React from "react";
export  const Span = (item) => (<span>
        {item?.person?.username} {item?.person?.firstName} <br/>{item?.person?.middleName}

    </span>);
