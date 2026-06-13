import "./App.css";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      {/* <div className="prototype-section">
        <h2>Prototype Drag n Drop - alles in einer Komponente</h2>
        <PrototypeDragDrop />
      </div>
      <div className="prototype-section">
        <h2>Prototype Drag n Drop - via globalem Context</h2>
        <PrototypeDragDropWithContext />
      </div>  */}

      {/*{currentView === "main" && (
        <div id="test-main-view">
          <Main onNavigateToUpload={() => setCurrentView("upload")} />
        </div>
      )}

      {currentView === "upload" && (
        <div id="test-upload-view">
          <Upload onNavigateBack={() => setCurrentView("main")} />
        </div>
      )}

      {/* Bitte nicht loeschen. Fuer's Frontend main View nach Login */}
      {/* <div id="test-main-view">
        <Main />
      </div> */}

      <RouterProvider router={router} />
    </>
  );
}

export default App;
