import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";
import MainRouting from "./user access/MainRouting";
import { useSelector } from 'react-redux'
function App() {
  const { userInfo } = useSelector((state) => state.auth)
  return (
    <div className='app text-white'>
      {userInfo && <Sidebar />}
      <MainRouting />
    </div>
  );
}

export default App;
