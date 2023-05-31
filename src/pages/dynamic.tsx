import { Navigate, Route, Routes } from "react-router-dom";

import { routes } from "../routes";
import { PRODUCT_PAGE_ROUTE } from "../routes/dictionary";

const DynamicPages = () => {
  return (
    <Routes>
      {routes.map(({ Component, exact, icon, name, path, withAuth }, index) => {
        return (
          <Route
            key={index}
            {...{ exact, icon, name, path }}
            element={<Component />}
          />
        );
      })}
      <Route path="*" element={<Navigate to={PRODUCT_PAGE_ROUTE} />} />
    </Routes>
  );
};

export default DynamicPages;
