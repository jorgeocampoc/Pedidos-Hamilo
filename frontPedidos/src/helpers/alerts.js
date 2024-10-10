import Swal from 'sweetalert2'



export const alertInfo = (title,text,icon,confirmButtonText)=>{
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
        confirmButtonColor: "#3085d6",
        
    });
}


export const alertConfirm = (title,text,icon, confirmButtonText,route)=>{
    Swal.fire({
        title,
        text,
        icon,
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        
        confirmButtonText,
      }).then((result) => {
        if (result.isConfirmed) {
            route.push('/login')
        }
    });
}
export const loading = ()=>{
    Swal.fire({
        showConfirmButton: false,
        timer: 2500,
        background: 'transparent', 
        backdrop: `
            rgba(0,0,0,0.5)
            url(https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87_w200.webp)
            center center
            no-repeat
        `
    });
}

export const notyf = new Notyf({
    duration: 2500,
    position: {
        x: 'center',
        y: 'center',
    },

});
