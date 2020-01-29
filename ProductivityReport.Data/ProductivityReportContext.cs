using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace ProductivityReport.Data {
	public class ProductivityReportContext : DbContext {
		public virtual DbSet<Conversation> Conversations { get; set; }
		public virtual DbSet<Message> Messages { get; set; }
		public virtual DbSet<Operator> Operators { get; set; }
		public virtual DbSet<Visitor> Visitors { get; set; }
		public ProductivityReportContext(DbContextOptions options) : base(options) {
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
			if (!optionsBuilder.IsConfigured) {
				optionsBuilder.UseSqlServer("SERVER=(localdb)\\MSSQLLocalDB;DATABASE=WolfPack;Trusted_Connection=True");
			}
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder) {
			modelBuilder.Entity<Conversation>(a => {
				a.HasKey(b => b.ConversationID).ForSqlServerIsClustered();
				a.Property(b => b.ConversationID).ValueGeneratedOnAdd();
				a.Property(b => b.Website).HasMaxLength(100);
				a.Property(b => b.PageName).HasMaxLength(100);
				a.Property(b => b.PageURL).HasMaxLength(100);
				a.HasOne(b => b.Operator).WithMany(c => c.Conversations).HasForeignKey(d => d.OperatorID).OnDelete(DeleteBehavior.Restrict);
				a.HasOne(b => b.Visitor).WithMany(c => c.Conversations).HasForeignKey(d => d.VisitorID).OnDelete(DeleteBehavior.Restrict);
			});

			modelBuilder.Entity<Message>(a => {
				a.HasKey(b => b.MessageID).ForSqlServerIsClustered();
				a.Property(b => b.MessageID).ValueGeneratedOnAdd();
				a.Property(b => b.MessageFrom).HasMaxLength(10);
				a.HasOne(b => b.Conversation).WithMany(c => c.Messages).HasForeignKey(d => d.ConversationID).OnDelete(DeleteBehavior.Restrict);
			});

			modelBuilder.Entity<Operator>(a => {
				a.HasKey(b => b.OperatorID).ForSqlServerIsClustered();
				a.Property(b => b.OperatorID).ValueGeneratedOnAdd();
				a.Property(b => b.Name).HasMaxLength(1000);
				a.Property(b => b.Email).HasMaxLength(1000);
				a.Property(b => b.Phone).HasMaxLength(1000);
			});

			modelBuilder.Entity<Visitor>(a => {
				a.HasKey(b => b.VisitorID).ForSqlServerIsClustered();
				a.Property(b => b.VisitorID).ValueGeneratedOnAdd();
				a.Property(b => b.Name).HasMaxLength(1000);
				a.Property(b => b.Email).HasMaxLength(1000);
				a.Property(b => b.Phone).HasMaxLength(500);
				a.Property(b => b.Browser).HasMaxLength(900);
				a.Property(b => b.Device).HasMaxLength(980);
				a.Property(b => b.IPAddress).HasMaxLength(890);
			});
		}
	}
}
