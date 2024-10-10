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