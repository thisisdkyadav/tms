"use client"

import LoadingSpinner from "../../../components/LoadingSpinner"
import styles from "./batches.module.css"

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <LoadingSpinner size="large" />
      <p>Loading batches data...</p>
    </div>
  )
}
