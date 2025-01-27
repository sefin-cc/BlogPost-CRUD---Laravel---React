import React from 'react';
import ReactLoading from 'react-loading';

export const LoadingScreen = () =>{
    return(
        <div className='w-full flex justify-center items-center p-28'>
            <ReactLoading type={'bubbles'} color={'#808080'} height={'9%'} width={'9%'} />
        </div>  
    );
}



