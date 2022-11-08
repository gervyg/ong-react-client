import React from 'react'
import OrganizationForm from '../organizationForm/OrganizationForm'
import styles from './styles/OrganizationPanel.module.css'

const OrganizationPanel = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sectionTitle}>
                <h1 className={styles.title}>Organización</h1>
            </div>
            <OrganizationForm />
        </div>
    )
}

export default OrganizationPanel
