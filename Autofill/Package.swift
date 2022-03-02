// swift-tools-version:5.5
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "Autofill",
    platforms: [
        .iOS("13.0"),
        .macOS("10.15")
    ],
    products: [
        // Products define the executables and libraries a package produces, and make them visible to other packages.
        .library(
            name: "Autofill",
            targets: ["Autofill"]),
    ],
    dependencies: [
        // Loose dependency as will be managed by macOS / iOS
        .package(url: "https://github.com/duckduckgo/BrowserServicesKit", from: "11.0.0")
    ],
    targets: [
        // Targets are the basic building blocks of a package. A target can define a module or a test suite.
        // Targets can depend on other targets in this package, and on products in packages this package depends on.
        .target(
            name: "Autofill",
            dependencies: ["BrowserServicesKit"],
            resources: [
                .process("Resources/")
            ]),
        .testTarget(
            name: "AutofillTests",
            dependencies: ["Autofill"]),
    ]
)
