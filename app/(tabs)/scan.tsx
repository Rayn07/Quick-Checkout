"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar, Vibration, Alert } from "react-native"
import { CameraView, useCameraPermissions } from "expo-camera"
import { Ionicons } from "@expo/vector-icons"

const { width, height } = Dimensions.get("window")

export default function() {
  const [permission, requestPermission] = useCameraPermissions()
  const [scannedData, setScannedData] = useState<string | null>(null)
  const [scanning, setScanning] = useState(true)
  const [flashEnabled, setFlashEnabled] = useState(false)
  const [scanHistory, setScanHistory] = useState<string[]>([])

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanning) return

    Vibration.vibrate(100)
    setScannedData(data)
    setScanning(false)

    // Add to scan history
    setScanHistory((prev) => [data, ...prev.slice(0, 4)]) // Keep last 5 scans
  }

  const resetScanner = () => {
    setScanning(true)
    setScannedData(null)
  }

  const toggleFlash = () => {
    setFlashEnabled(!flashEnabled)
  }

  const copyToClipboard = () => {
    // In a real app, you'd use Clipboard from @react-native-clipboard/clipboard
    Alert.alert("Copied", "Barcode data copied to clipboard")
  }

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading camera...</Text>
      </View>
    )
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera-outline" size={80} color="#666" />
        <Text style={styles.permissionTitle}>Camera Access Required</Text>
        <Text style={styles.permissionText}>We need access to your camera to scan barcodes and QR codes</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Camera Permission</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {scanning && (
        <>
          <CameraView
            style={styles.camera}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "ean13", "code128", "code39", "codabar", "ean8", "upc_a", "upc_e"],
            }}
            onBarcodeScanned={handleBarCodeScanned}
            enableTorch={flashEnabled}
          />

          {/* Overlay with scanning frame */}
          <View style={styles.overlay}>
            <View style={styles.topOverlay} />
            <View style={styles.middleRow}>
              <View style={styles.sideOverlay} />
              <View style={styles.scanFrame}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
                <View style={styles.scanLine} />
              </View>
              <View style={styles.sideOverlay} />
            </View>
            <View style={styles.bottomOverlay}>
              <Text style={styles.instructionText}>Position the barcode within the frame to scan</Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
              <Ionicons
                name={flashEnabled ? "flash" : "flash-off"}
                size={24}
                color={flashEnabled ? "#FFD700" : "#FFF"}
              />
              <Text style={styles.controlText}>Flash</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {scannedData && (
        <View style={styles.resultContainer}>
          <View style={styles.resultHeader}>
            <Ionicons name="checkmark-circle" size={40} color="#4CAF50" />
            <Text style={styles.resultTitle}>Scan Successful!</Text>
          </View>

          <View style={styles.resultContent}>
            <Text style={styles.resultLabel}>Scanned Data:</Text>
            <View style={styles.dataContainer}>
              <Text style={styles.resultData} numberOfLines={3}>
                {scannedData}
              </Text>
              <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                <Ionicons name="copy-outline" size={20} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </View>

          {scanHistory.length > 1 && (
            <View style={styles.historyContainer}>
              <Text style={styles.historyTitle}>Recent Scans:</Text>
              {scanHistory.slice(1, 4).map((item, index) => (
                <Text key={index} style={styles.historyItem} numberOfLines={1}>
                  {item}
                </Text>
              ))}
            </View>
          )}

          <View style={styles.resultActions}>
            <TouchableOpacity style={styles.scanAgainButton} onPress={resetScanner}>
              <Ionicons name="scan-outline" size={20} color="#FFF" />
              <Text style={styles.scanAgainText}>Scan Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    color: "#FFF",
    fontSize: 16,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  permissionText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  permissionButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  permissionButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  middleRow: {
    flexDirection: "row",
    height: 250,
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  scanFrame: {
    width: 250,
    height: 250,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "#00FF00",
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanLine: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#00FF00",
    opacity: 0.8,
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  instructionText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  controls: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  controlButton: {
    alignItems: "center",
    padding: 15,
  },
  controlText: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 5,
  },
  resultContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  resultHeader: {
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 40,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  resultContent: {
    marginBottom: 30,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 10,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F8F9FA",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  resultData: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  copyButton: {
    padding: 5,
    marginLeft: 10,
  },
  historyContainer: {
    marginBottom: 30,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 10,
  },
  historyItem: {
    fontSize: 14,
    color: "#999",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#F8F9FA",
    marginBottom: 5,
    borderRadius: 5,
  },
  resultActions: {
    alignItems: "center",
  },
  scanAgainButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  scanAgainText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
})
