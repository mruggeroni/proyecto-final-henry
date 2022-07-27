import React, { useState } from 'react';
import s from './UserEdit.module.css';

export default function UserEdit() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <button onClick={handleShow}>
        Perfil
      </button>

      <div className={ show ? s.open_profile : s.close_profile }>
        <div className={s.profile_container}>
            <div className={s.profile_menu}>
                <div className={s.profile_menu_title}>
                    <span>Hola,</span>
                    <h3>Chochi</h3>
                </div>
                <hr />
                <button>Mi Perfil</button>
                <button>Bla bla bla</button>
                <button>Datos de pago</button>
                <button>Configuraciones</button>
                <button>Finalizar Sesión</button>
            </div>
            <div className={s.profile_menu_item}>
                <p>Title</p>
                <img src='https://www.avesdeuruguay.com/cres.jpg' 
                className={s.profile_menu_item_img} 
                alt="chochi not found" />    
            </div>
        {/* <footer>
          <button onClick={handleClose}>
            Close
          </button>
          <button onClick={handleClose}>
            Save Changes
          </button>
        </footer> */}
        </div>
      </div>
    </div>
  );
}