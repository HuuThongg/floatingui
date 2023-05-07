import './App.css'
import { forwardRef, useRef } from 'react';
import BasisToolTip from './components/tooltip/BasisToolTip';
import EmojiPicker from './components/EmojiPicker';
import ListNavigation from './components/ListNavigation';
import Combobox from './components/Combobox';
import MacOSSelect from './components/MacOSSelect';
import SellectColor from './components/SellectColor';
import DropdownMenu from './components/DropdownMenu';
import BasisDialog from './components/dialog/BasisDialog';
import ReusableDialog from './components/dialog/ReusableDialog';
import BasisPopover from './components/popover/BasisPopover';

const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});
function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form>
      <MyInput label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
function App() {
  return (
    <div>
      
      <h1>Floating-ui</h1>
      <div style={{ padding: "40px auto ",marginTop:1800 }}>

      <BasisToolTip />
      <Form />
      <EmojiPicker/>
      </div>
      hekki
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto quae dolores dolore, consequuntur nam doloribus modi cumque exercitationem ea. Voluptatum laboriosam doloribus numquam necessitatibus repudiandae fugit sit, inventore minima quibusdam culpa tenetur placeat delectus, dolorem voluptates deleniti magni, quisquam deserunt maxime odit adipisci suscipit nesciunt assumenda. Qui aliquam nostrum ad quae. Ratione, pariatur rerum autem excepturi eligendi sunt accusamus praesentium cum ut vel soluta necessitatibus repellat veniam suscipit officia corporis. Quia quaerat veniam dolores magnam saepe nulla commodi hic quod aliquid, ut, suscipit minus. Laudantium sunt autem, minima voluptatem harum dolore libero voluptatum obcaecati similique minus nulla ea magni officiis eaque cupiditate voluptates! Voluptas, exercitationem consectetur voluptatibus quisquam repellendus, eos quia cupiditate tenetur perferendis, quidem dolor! Fugiat, provident possimus. Sed ea eos animi,
      <div style={{padding:"40px auto "}}>
        <Combobox/>
      </div>
       expedita officiis voluptas fugit porro vero dolorem repudiandae eius consequuntur. Tempore est, dolores numquam magnam a itaque dolorum pariatur mollitia culpa qui tempora eveniet ea sed architecto perspiciatis eos libero repellendus aliquid corporis. Reprehenderit ea mollitia odit qui, veniam aliquid harum ab corrupti non illum, inventore ullam impedit voluptatibus ipsam, obcaecati similique. Nobis aliquam natus odio quidem quos dicta fuga dolorem error laudantium, excepturi vero voluptatibus neque similique ipsum libero possimus ducimus! Modi in repellendus facilis dolores. Suscipit rerum impedit laboriosam, nisi saepe, in quae error repellendus rem possimus doloremque voluptatibus iste similique recusandae quod. Quas eum aliquid iure cumque id quasi facilis quis. Quod incidunt aperiam tempora velit repellendus similique sequi nesciunt, delectus ad deserunt ut saepe? Blanditiis pariatur distinctio libero in ea suscipit eligendi quod doloremque quia. Similique deserunt iste quod iure, consequatur tenetur pariatur facere corporis fuga, at voluptates perferendis porro! Explicabo error inventore aperiam maxime. Explicabo, dicta perferendis iure quod at quia necessitatibus doloribus, beatae eaque pariatur fugit debitis ad magni cum corporis cupiditate vero sed incidunt placeat inventore illo delectus excepturi mollitia reiciendis. Officiis quo a sunt repudiandae et soluta pariatur debitis nobis doloribus tempora unde ut totam blanditiis iste animi perferendis ipsa, libero quam illum aperiam nihil atque? Temporibus iste necessitatibus voluptatibus aspernatur, nesciunt natus at exercitationem fuga explicabo animi repellat dolor est odit minus perferendis distinctio totam cupiditate. Recusandae rerum nisi quam et, quae culpa corrupti error fugiat itaque ullam earum alias minus ducimus? Similique rerum numquam eos minima natus sapiente corrupti voluptatem eum facere illum? Ipsam excepturi dolorum sapiente, aperiam, mollitia expedita quo dolores doloribus in atque accusamus repudiandae illo laborum dicta omnis, id autem nisi at. Nobis, facere?
      {/* <ListNavigation/> */}
      <div style={{ margin: "40px auto " }}>
        <MacOSSelect/>
      </div>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi obcaecati at illo neque? Molestias molestiae libero, iste similique a alias qui vel itaque fugiat adipisci animi quidem, vitae nemo sit suscipit! Perspiciatis, nulla voluptate fugiat repudiandae est voluptas minus? Ducimus dolor veritatis quam consequuntur debitis, quisquam blanditiis voluptatum ratione sequi quis tempore delectus quidem? Pariatur soluta quod hic optio facere aspernatur qui tempora, dolore, adipisci quae, quisquam eum dolor odit! Laudantium soluta itaque eos voluptatum dicta aspernatur vitae fugiat corrupti fuga, sunt aut quaerat id consequatur atque odit debitis nemo! Consectetur officiis exercitationem repudiandae suscipit sint rerum, incidunt cupiditate veritatis debitis commodi dolore quo ut harum, dolores saepe necessitatibus ea consequatur aperiam distinctio sapiente eum 
      <div style={{ margin: "40px auto " }}>
        <SellectColor/>
      </div>
      aliquam unde. Inventore dignissimos voluptatibus a amet id maxime, at voluptatum beatae qui quisquam unde quia est consequatur quo, modi sit tenetur illo animi. Optio illum iure perspiciatis, autem suscipit, numquam vitae officia dolore quisquam natus officiis quam ipsa exercitationem incidunt nulla. Cum nisi corrupti a saepe eos in nam et deleniti rerum nihil perferendis, quod ea facilis. Consectetur, sapiente ducimus praesentium quis voluptatibus ut expedita. Recusandae maxime officiis dolore cupiditate praesentium ratione cum consequuntur rerum, omnis sint mollitia quasi ipsa voluptatibus tempora eaque illum!
      <div style={{ margin: "40px auto " }}>
        <DropdownMenu />
      </div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ad maiores rerum, numquam at rem molestiae similique accusamus possimus accusantium necessitatibus repudiandae vitae placeat porro! Magni a voluptate nobis impedit, necessitatibus dolor ipsam atque voluptas alias suscipit magnam dolorum quidem non excepturi iure eos optio sed voluptatibus dicta unde sequi amet expedita hic! Quis pariatur debitis perferendis provident! Asperiores dolorem a adipisci aliquid iure inventore dignissimos nostrum nemo provident sunt nam delectus voluptatibus reprehenderit non, quae, autem obcaecati ducimus quas! Ut, quo assumenda sunt pariatur dolorem quas quibusdam voluptatem? Veritatis unde totam quos, consequuntur rem dolorem pariatur? Obcaecati esse qui architecto, ad ea placeat est aperiam consequatur blanditiis in error nobis impedit atque illum dolore quidem 

      <div style={{ margin: "40px auto " }}>

        <ListNavigation />
      </div>
      divnecessitatibus sapiente similique pariatur nostrum incidunt nulla doloribus? Aliquid consectetur animi natus magnam non, dolores ea esse error quae autem temporibus, aspernatur tenetur voluptas ut labore corrupti ipsa, enim quidem beatae tempora! Voluptatibus ea maiores voluptatem aliquid consequatur hic eum odio, delectus velit veniam sit, molestias cum suscipit? Ullam nulla commodi non ad molestias repellat quidem distinctio doloribus perferendis vero nesciunt, recusandae in. Consequatur exercitationem quam nisi non aliquam quo, dignissimos beatae possimus amet impedit repudiandae, voluptate, porro aperiam ipsa illo perspiciatis ipsam pariatur?
      <div style={{ margin: "40px auto " }}>

        <BasisDialog />
      </div>
      divnecessitatibus sapiente similique pariatur nostrum incidunt nulla doloribus? Aliquid consectetur animi natus magnam non, dolores ea esse error quae autem temporibus, aspernatur tenetur voluptas ut labore corrupti ipsa, enim quidem beatae tempora! Voluptatibus ea maiores voluptatem aliquid consequatur hic eum odio, delectus velit veniam sit, molestias cum suscipit? Ullam nulla commodi non ad molestias repellat quidem distinctio doloribus perferendis vero nesciunt, recusandae in. Consequatur exercitationem quam nisi non aliquam quo, dignissimos beatae possimus amet impedit repudiandae, voluptate, porro aperiam ipsa illo perspiciatis ipsam pariatur?
      <div style={{ margin: "40px auto " }}>

        <ReusableDialog />
      </div>
      divnecessitatibus sapiente similique pariatur nostrum incidunt nulla doloribus? Aliquid consectetur animi natus magnam non, dolores ea esse error quae autem temporibus, aspernatur tenetur voluptas ut labore corrupti ipsa, enim quidem beatae tempora! Voluptatibus ea maiores voluptatem aliquid consequatur hic eum odio, delectus velit veniam sit, molestias cum suscipit? Ullam nulla commodi non ad molestias repellat quidem distinctio doloribus perferendis vero nesciunt, recusandae in. Consequatur exercitationem quam nisi non aliquam quo, dignissimos beatae possimus amet impedit repudiandae, voluptate, porro aperiam ipsa illo perspiciatis ipsam pariatur?
      <BasisPopover/>
    </div>
  )
}

export default App
