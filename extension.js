const Main = imports.ui.main;


let topBarClickListener_;


/*!
 * Check if a window is active.
 */
function IsActiveWindow(window) {
    let activeWorkspaceIndex = global.screen.get_active_workspace_index();
    
    let metaWindow = window.get_meta_window();
    let workspaceIndex = metaWindow.get_workspace().index();
    
    return metaWindow.has_focus() && (workspaceIndex == activeWorkspaceIndex);
}


/*!
 * Get the active window.
 */
function GetActiveWindow() {
    let activeWindows = global.get_window_actors().filter(
        function(window) {
            return IsActiveWindow(window);
        }
    );
    
    return ((activeWindows.length > 0) ? activeWindows[0] : null);
}


/*!
 * Top bar click handler.
 */
function TopBarClick(_, event) {
    if (event.get_button() == 2) {
        // Middle click
        
        // Get active window
        let window = GetActiveWindow();
        
        if (window != null) {
            window.get_meta_window().lower();
        }
    }
}


/*!
 * Enable extension.
 */
function enable() {
    // Add listener to handle top bar clicks
    topBarClickListener_ = Main.panel.actor.connect("button-press-event", TopBarClick);
}



/*!
 * Disable extension.
 */
function disable() {
    // Remove listener
    Main.panel.actor.disconnect(topBarClickListener_);
}
