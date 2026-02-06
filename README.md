<div align="center">

# JeffreyOS

[ʟ ɪ ᴠ ᴇ  -  ᴘ ʀ ᴇ ᴠ ɪ ᴇ ᴡ](https://JeffreyOS.Pages.Dev)

![System Status](https://img.shields.io/badge/SYSTEM-ONLINE-success?style=for-the-badge&logo=linux)
![Build](https://img.shields.io/badge/BUILD-v1.0.0-blueviolet?style=for-the-badge)
![Uptime](https://img.shields.io/badge/UPTIME-99.9%25-blue?style=for-the-badge)

---

JeffreyOS is a meticulously crafted digital experience simulating the personal operating system of [Jeffrey Epstein](https://en.wikipedia.org/wiki/Jeffrey_Epstein). This project is a web-based, high-fidelity OS simulation that runs entirely in your browser.

---

## Overview

The simulation provides an immersive look into a fictionalized digital environment, complete with a suite of applications, a file system, and interactive narratives. The system state is persisted locally in your browser's `localStorage`, ensuring your session is saved between visits. The interface is designed to be responsive, offering a seamless experience on both desktop and mobile devices.

## Features

*   **Modern OS Interface:** A complete desktop environment featuring a dynamic wallpaper, an application dock, a system header bar, and an onboarding guide for new users.
*   **Window Management:** A fluid windowing system that supports opening, closing, maximizing, and refreshing applications with smooth animations.
*   **Control Center:** Access system settings, toggle between light and dark themes, and view informational pages like 'About', 'Terms of Service', and 'Privacy Policy'.
*   **Application Suite:** Launch a variety of simulated applications, including:
    *   **Web Apps:** Parody applications such as Jmail, JMessages, JPhotos, and JDrive that load content in a web view.
    *   **Finder:** A file explorer that provides organized access to public documents, including DOJ disclosures and FBI records from The Vault.
    *   **Story App:** An immersive, scroll-driven narrative detailing key events and connections in an interactive format.
*   **Local Persistence:** All application states and user interactions are saved locally, providing a continuous experience across sessions.

## Technology Stack

*   **Framework:** React
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React
*   **State Management:** React Context API

## Running Locally

To run JeffreyOS on your local machine, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/muneebwanee/JeffreyOS.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd JeffreyOS
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Start the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## License

This project is licensed under the GNU Affero General Public License v3.0. See the [LICENSE](LICENSE) file for more details. Proper attribution is required for any reproduction of this work.
