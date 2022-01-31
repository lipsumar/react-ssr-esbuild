const { spawn } = require("child_process");
const copyPlugin = require("esbuild-plugin-copy").default;
const esbuild = require("esbuild");
const argv = require("minimist")(process.argv.slice(2));
let serverProcess;

function startServer() {
  console.log("start");
  serverProcess = spawn("node", [
    "-r",
    "source-map-support/register",
    "build/out.js",
  ]);

  serverProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  serverProcess.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  serverProcess.on("error", (error) => {
    console.log(`error: ${error.message}`);
  });

  serverProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
function stopServer() {
  serverProcess.kill();
}

// server
esbuild
  .build({
    entryPoints: ["src/server/index.js"],
    outfile: "build/out.js",
    bundle: true,
    platform: "node",
    inject: ["./esbuild/react-shim.js"],
    sourcemap: true,
    jsxFactory: "jsx",
    watch: argv.watch
      ? {
          onRebuild(error) {
            stopServer();
            if (error) {
              console.error("[server] watch build failed");
            } else {
              console.log("[server] watch build succeeded");
              startServer();
            }
          },
        }
      : null,
    plugins: [
      // @todo these are not watched
      copyPlugin({
        assets: {
          from: ["./src/server/views/*"],
          to: ["./views"],
        },
      }),
    ],
  })
  .then(() => {
    if (argv.watch) {
      console.log("[server] watching...");
      startServer();
    }
  });

// client
const clientConfig = {
  entryPoints: ["src/client/index.jsx"],
  bundle: true,
  inject: ["./esbuild/react-shim.js"],
  sourcemap: true,
  jsxFactory: "jsx",
};
if (argv.watch) {
  esbuild
    .serve(
      {
        servedir: "src/client",
      },
      clientConfig
    )
    .then(() => {
      console.log("[client] serving...");
    });
} else {
  esbuild.build({ ...clientConfig, outfile: "dist/index.js" });
}
