import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Heart,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';

export default function Settings() {
  const handleProfilePress = () => {
    Alert.alert('Profile', 'Profile settings would open here in a full implementation.');
  };

  const handleNotificationsPress = () => {
    Alert.alert('Notifications', 'Notification preferences would open here.');
  };

  const handlePrivacyPress = () => {
    Alert.alert('Privacy & Security', 'Privacy and security settings would open here.');
  };

  const handleCaregiversPress = () => {
    Alert.alert('Caregivers', 'Caregiver management would open here.');
  };

  const handleHelpPress = () => {
    Alert.alert('Help & Support', 'Help and support resources would open here.');
  };

  const handleSignOutPress = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => {
          Alert.alert('Signed Out', 'You have been signed out successfully.');
        }}
      ]
    );
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    iconColor = '#6b7280',
    iconBgColor = '#f3f4f6',
    showChevron = true 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress: () => void;
    iconColor?: string;
    iconBgColor?: string;
    showChevron?: boolean;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingContent}>
        <View style={[styles.settingIcon, { backgroundColor: iconBgColor }]}>
          {icon}
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showChevron && <ChevronRight color="#9ca3af" size={16} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <SettingsIcon color="#2563eb" size={28} />
          </View>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Manage your account and app preferences</Text>
        </View>

        {/* User Profile Section */}
        <View style={styles.section}>
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <User color="#ffffff" size={32} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
            </View>
            <TouchableOpacity onPress={handleProfilePress}>
              <ChevronRight color="#9ca3af" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={<Bell color="#2563eb" size={20} />}
              title="Notifications"
              subtitle="Manage medication reminders and alerts"
              onPress={handleNotificationsPress}
              iconBgColor="#eff6ff"
            />
            <SettingItem
              icon={<Shield color="#10b981" size={20} />}
              title="Privacy & Security"
              subtitle="Control your data and privacy settings"
              onPress={handlePrivacyPress}
              iconBgColor="#ecfdf5"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Care Team</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={<Heart color="#dc2626" size={20} />}
              title="Manage Caregivers"
              subtitle="Add or remove caregivers and their permissions"
              onPress={handleCaregiversPress}
              iconBgColor="#fef2f2"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={<HelpCircle color="#f59e0b" size={20} />}
              title="Help & Support"
              subtitle="Get help, report issues, or contact support"
              onPress={handleHelpPress}
              iconBgColor="#fffbeb"
            />
          </View>
        </View>

        {/* Sign Out */}
        <View style={styles.section}>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={<LogOut color="#dc2626" size={20} />}
              title="Sign Out"
              onPress={handleSignOutPress}
              iconBgColor="#fef2f2"
              showChevron={false}
            />
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>MedReminder v1.0.0</Text>
          <Text style={styles.appInfoSubtext}>
            Your trusted medication companion
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    marginLeft: 4,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748b',
  },
  settingsGroup: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },
  appInfo: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  appInfoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 4,
  },
  appInfoSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },
});