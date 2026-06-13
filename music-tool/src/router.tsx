import { createBrowserRouter, Outlet } from "react-router-dom";
import { DataCollectionProvider, AuthProvider, Login, Main, Upload, SongBrowserProvider, MetadataDialogProvider, MetadataDialog } from "@/index";

/**
 * Wichtig, damit der AuthProvider zur Verfuegung steht.
 */
function AppShell() {
  return (
    <DataCollectionProvider>
      <AuthProvider>
        <SongBrowserProvider>
          <MetadataDialogProvider>
            <AppContent />
          </MetadataDialogProvider>
        </SongBrowserProvider>
      </AuthProvider>
    </DataCollectionProvider>
  );
}

function AppContent() {
  return (
    <>
      <MetadataDialog />
      <Outlet />
    </>
  );
}

const appRouter = [
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Login /> },
      { path: "/main", element: <Main /> },
      { path: "/upload", element: <Upload /> },
    ],
  },
];

export const router = createBrowserRouter(appRouter);
