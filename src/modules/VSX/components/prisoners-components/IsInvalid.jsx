import React from "react";
export const IsInvalid =(item) => (
    <div className={(item ? 'seccess':'error')}></div>
)
