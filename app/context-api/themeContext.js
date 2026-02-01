const { createContext } = require("react");

const themeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children, isDark, toggleTheme }) => {
  return (
    <themeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
}

module.exports = themeContext;