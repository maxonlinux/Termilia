#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::menu::Menu;
// use tauri::WindowEvent;
use tauri::{AppHandle, Emitter, Manager};
// use tauri_plugin_decorum::WebviewWindowExt;
use window_vibrancy::*;

#[tauri::command]
fn set_always_on_top(window: tauri::Window, always_on_top: bool) {
    let _ = window.set_always_on_top(always_on_top);
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build())
        .invoke_handler(tauri::generate_handler![set_always_on_top])
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();

            #[cfg(target_os = "macos")]
            {
                // window.create_overlay_titlebar().unwrap();

                // Set a custom inset to the traffic lights
                // window.set_traffic_lights_inset(12.0, 16.0).unwrap();

                // Make window transparent without privateApi
                // window.make_transparent().unwrap();

                // Set window level
                // NSWindowLevel: https://developer.apple.com/documentation/appkit/nswindowlevel
                // window.set_window_level(25).unwrap();

                // NSVisualEffectMaterial::Dark
                apply_vibrancy(&window, NSVisualEffectMaterial::Sidebar, None, None)
                    .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
            }

            #[cfg(target_os = "windows")]
            {
                apply_blur(&window, Some((18, 18, 18, 125)))
                    .expect("Unsupported platform! 'apply_blur' is only supported on Windows");
            }

            #[cfg(desktop)]
            {
                app.on_menu_event(|app_handle: &AppHandle, event| {
                    println!("context menu clicked!");
                    println!("menu event: {:?}", event);
                    app_handle.emit("menu-event", event.id).unwrap();
                });
            }

            Ok(())
        })
        // .on_window_event(|window, e| {
        //     let win = window.get_webview_window("main").unwrap();
        //     win.set_traffic_lights_inset(12.0, 16.0).unwrap();
        // })
        .menu(|app_handle| Menu::default(app_handle))
        .plugin(tauri_plugin_pty::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
